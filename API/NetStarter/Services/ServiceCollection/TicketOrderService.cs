using AutoMapper;
using Bond;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using NetStarter.Data;
using NetStarter.Data.Models;
using NetStarter.Dtos.TicketOrder;
using NetStarter.Dtos.TicketOrders;
using NetStarter.Services.IServiceCollection;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace NetStarter.Services.ServiceCollection
{
    public class TicketOrderService : ITicketOrderService
    {

        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IFileStorageService _fileStorageService;
        private readonly string containerName = "EVoucher";
        private readonly IConfiguration _config;
        private readonly PaymentService _paymentService;
        static Random random = new Random();
        private readonly IRedisService _service;
        private readonly IDistributedCache _redisCache;

        public TicketOrderService(IMapper mapper, ApplicationDbContext context, IHttpContextAccessor httpContextAccessor,
            IFileStorageService fileStorageService, IConfiguration config,PaymentService paymentService,
            IDistributedCache cache
            )
        {
            _mapper = mapper;
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _fileStorageService = fileStorageService;
            _config = config;
            _paymentService = paymentService;
            _redisCache = cache ?? throw new ArgumentNullException(nameof(cache));
        }

        private int GetUserIdFromClaims() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));


        public async Task<ServiceResponse<List<GetTicketOrderDto>>> TicketOrderByRelatedUser(AddTicketOrderDto inputModel)
        {

            ServiceResponse<List<GetTicketOrderDto>> serviceResponse = new ServiceResponse<List<GetTicketOrderDto>>();
            try
            {
                TicketOrder order = _mapper.Map<TicketOrder>(inputModel);

                order.User = await _context.Users.FirstOrDefaultAsync(x => x.ActiveFlag == true && x.Id == GetUserIdFromClaims());

                if (order.User == null)
                {

                    serviceResponse.Success = true;
                    serviceResponse.Message = "user doesn't exit";
                    serviceResponse.Status = APIStatus.Successful;

                }
                else
                {
                  

                    if (inputModel.Picture != null)
                    {
                        order.PictureURL = await _fileStorageService.SaveFile(containerName, inputModel.Picture);
                    }
                    order.Amount = inputModel.Quantity * 8;
                    order.OrderStatus = Data.Enum.OrderStatus.PaymentReceived;
                    order.PaymentIntentId = inputModel.paymentIntendId;
                    order.ClientSecrete = inputModel.clientSecret;
                    order.OrderDate = DateTime.UtcNow;
                    order.CreateBy = 1;
                    order.CreateDate = DateTime.UtcNow;
                    order.ActiveFlag = true;
                    await _context.TicketOrders.AddAsync(order);
                    var ret = await _context.SaveChangesAsync();

                    if (ret == 1)
                    {

                        int vouchersToGenerate = inputModel.Quantity;
                        int lengthOfVoucher = 11;

                        List<string> generatedVouchers = new List<string>();
                        char[] keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890".ToCharArray();

                        for (int i = 0; i < order.Quantity; i++)
                        {
                            var voucherCode = GenerateVoucher(keys, lengthOfVoucher);
                            var redisCode = await _redisCache.GetStringAsync(voucherCode);
                            if (!String.IsNullOrEmpty(redisCode))
                            {
                                i--;
                            }
                            else
                            {
                                if (!generatedVouchers.Contains(voucherCode))
                                {

                                    OrderEvocher voucher = new OrderEvocher();

                                    if (inputModel.Picture != null)
                                    {
                                        voucher.PictureUrl = await _fileStorageService.SaveFile(containerName, inputModel.Picture);
                                    }


                                    voucher.Title = inputModel.Title;
                                    voucher.Description = inputModel.Description;
                                    voucher.ExpireDate = DateTime.UtcNow.AddDays(7);
                                    voucher.Amount = 8;
                                    voucher.promocode = voucherCode;
                                    voucher.TicketOrder = order;
                                    voucher.AccessPhoneNumber = inputModel.AccessPhoneNumber;
                                    voucher.VoucherType = inputModel.VoucherType;
                                    voucher.Used = false;
                                    voucher.CreateDate = DateTime.UtcNow;
                                    voucher.CreateBy = 1;
                                    voucher.ActiveFlag = true;
                                    await _context.OrderEvochers.AddAsync(voucher);
                                    var result = await _context.SaveChangesAsync(true);
                                    if(result == 1)
                                    {
                                        await _redisCache.SetStringAsync(voucherCode, "this is promocodes");
                                    }
                                }
                            }
                        }
                        serviceResponse.Success = true;
                        serviceResponse.Message = "add successfully";
                        serviceResponse.Status = APIStatus.Successful;
                        serviceResponse.Data = (_context.TicketOrders.Where(x => x.User.Id == GetUserIdFromClaims()).Select(x => _mapper.Map<GetTicketOrderDto>(x))).ToList();
                    }
                    else
                    {

                        serviceResponse.Success = true;
                        serviceResponse.Message = "something wrong .. add failure";
                        serviceResponse.Status = APIStatus.Successful;

                    }

                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                serviceResponse.Error = ex.StackTrace;
                serviceResponse.Status = APIStatus.Error;
            }
            return serviceResponse;

        }

        public async Task<ServiceResponse<List<GetTicketOrderDto>>> GetOrderWithRelatedUser()
        {
            ServiceResponse<List<GetTicketOrderDto>> serviceResponse = new ServiceResponse<List<GetTicketOrderDto>>();
            List<TicketOrder> data = await _context.TicketOrders.ToListAsync();
            serviceResponse.Data = (data.Select(c => _mapper.Map<GetTicketOrderDto>(c))).ToList();
            return serviceResponse;
        }

        private static string GenerateVoucher(char[] keys, int lengthOfVoucher)
        {
            return Enumerable
                .Range(1, lengthOfVoucher) // for(i.. ) 
                .Select(k => keys[random.Next(0, keys.Length - 1)])  // generate a new random char 
                .Aggregate("", (e, c) => e + c); // join into a string
        }

        public async Task<ServiceResponse<GetPaymentData>> GetPaymentData(QuantityForPayment inputModel)
        {
            ServiceResponse<GetPaymentData> serviceResponse = new ServiceResponse<GetPaymentData>();
            GetPaymentData data = new GetPaymentData();

            var intent = await _paymentService.CreateOrUpdatePaymentIntent(inputModel.Quantity);

            if (intent == null)
            {
              
                serviceResponse.Success = false;
                serviceResponse.Message = "Problem With Payment";

                return(serviceResponse);
            }
            data.Id = intent.Id;
            data.ClientSecret = intent.ClientSecret;


            serviceResponse.Success = true;
            serviceResponse.Message = "Payment Intent Data";
            serviceResponse.Status = APIStatus.Successful;
            serviceResponse.Data = data; 

            return(serviceResponse);
        }
    }
}

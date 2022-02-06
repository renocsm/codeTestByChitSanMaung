using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NetStarter.Data;
using NetStarter.Data.Models;
using NetStarter.Dtos.EVoucher;
using NetStarter.Services.IServiceCollection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NetStarter.Services.ServiceCollection
{
    public class EVoucherService : IEvoucherService
    {

        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
      
        public EVoucherService(IMapper mapper, ApplicationDbContext context, IHttpContextAccessor httpContextAccessor
             
            )
        {
            _mapper = mapper;
            _context = context; 
            _httpContextAccessor = httpContextAccessor;
          
        }

        private int GetUserIdFromClaims() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
        public async Task<ServiceResponse<GetEVoucherDto>> GetAllEVoucherByIdWithRelatedUser(int id)
        {
            ServiceResponse<GetEVoucherDto> serviceResponse = new ServiceResponse<GetEVoucherDto>();
            OrderEvocher data = await _context.OrderEvochers
                                    .Include(x=> x.TicketOrder)
                                    .FirstOrDefaultAsync(x => x.Id == id && x.TicketOrder.User.Id== GetUserIdFromClaims());
            serviceResponse.Data = _mapper.Map<GetEVoucherDto>(data);
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetEVoucherDto>>> GetAllEVoucherWithRelatedUser()
        {
            ServiceResponse<List<GetEVoucherDto>> serviceResponse = new ServiceResponse<List<GetEVoucherDto>>();
            List<OrderEvocher> data = await _context.OrderEvochers.ToListAsync();
            serviceResponse.Data = (data.Select(c => _mapper.Map<GetEVoucherDto>(c))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetEVoucherDto>> AppliedEVoucher(ApplyEVoucherDto inputModel)
        {
            ServiceResponse<GetEVoucherDto> serviceResponse = new ServiceResponse<GetEVoucherDto>();
            OrderEvocher EVoucher = await _context.OrderEvochers
                                        .FirstOrDefaultAsync(x => x.promocode == inputModel.Promocode
                                        && x.ActiveFlag == true);
            if(EVoucher != null)
            {
                if (EVoucher.VoucherType.Equals("gift", StringComparison.CurrentCultureIgnoreCase))
                {
                    if(inputModel.AccessPhoneNumber == null)
                    {
                        serviceResponse.Message = "Payment Unsuccessful, Need phone number to use this promo code";
                        serviceResponse.Status = APIStatus.Error;
                        return serviceResponse;
                    }
                    else
                    {
                        if(!EVoucher.AccessPhoneNumber.Equals(inputModel.AccessPhoneNumber, StringComparison.CurrentCultureIgnoreCase))
                        {
                            serviceResponse.Message = "Wrong Phone Number With Related Promocode";
                            serviceResponse.Status = APIStatus.Error;
                            return serviceResponse;
                        }
                    }
                    
                }

                EVoucher.Used = true;
                EVoucher.ActiveFlag = false;
                EVoucher.UpdateDate = DateTime.Now;
                EVoucher.UpdateBy = GetUserIdFromClaims();

                _context.OrderEvochers.Update(EVoucher);
                var ret = await _context.SaveChangesAsync();

                if (ret==1)
                {
                    serviceResponse.Message = "Payment Successful";
                    serviceResponse.Status = APIStatus.Successful;
                    serviceResponse.Data = _mapper.Map<GetEVoucherDto>(EVoucher);
                }
                else
                {
                    serviceResponse.Message = "Something Wrong";
                    serviceResponse.Status = APIStatus.Error;
                }
            }
            else
            {
                serviceResponse.Message = "Invalid Promo Code";
                serviceResponse.Status = APIStatus.Successful;
            } 

            return serviceResponse;
        }
    }
}

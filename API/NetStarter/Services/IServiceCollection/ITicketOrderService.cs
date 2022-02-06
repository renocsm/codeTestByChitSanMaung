using NetStarter.Data.Models;
using NetStarter.Dtos.TicketOrder;
using NetStarter.Dtos.TicketOrders;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NetStarter.Services.IServiceCollection
{
    public interface ITicketOrderService
    {
        Task<ServiceResponse<List<GetTicketOrderDto>>> TicketOrderByRelatedUser(AddTicketOrderDto inputModel);

        Task<ServiceResponse<List<GetTicketOrderDto>>> GetOrderWithRelatedUser();

        Task<ServiceResponse<GetPaymentData>> GetPaymentData(QuantityForPayment inputModel);
    }
}

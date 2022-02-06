using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetStarter.Dtos.MkEmployee;
using NetStarter.Dtos.TicketOrder;
using NetStarter.Dtos.TicketOrders;
using NetStarter.Services;
using NetStarter.Services.IServiceCollection;
using QRCoder;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;

namespace NetStarter.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/ticketOrder")]
    public class TicketOrderController : ControllerBase
    {
        private readonly ITicketOrderService _service;
        private readonly PaymentService _paymentService;
        public TicketOrderController(ITicketOrderService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("buyTicket")]
        public async Task<IActionResult> AddNewEmployee(AddTicketOrderDto inputModel)
        {
            return Ok(await _service.TicketOrderByRelatedUser(inputModel));
        }

        [HttpGet]
        [Route("GetAllTicket")]
        public async Task<IActionResult> GetAllRelatedCharacter()
        {
            return Ok(await _service.GetOrderWithRelatedUser());
        }

        [HttpPost]
        [Route("GetPaymentData")]
        public async Task<IActionResult> GetPaymentData([FromBody] QuantityForPayment inputModel)
        {
            return Ok(await _service.GetPaymentData(inputModel));
        }

    }
}

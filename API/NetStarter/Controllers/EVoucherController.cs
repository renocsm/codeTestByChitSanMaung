using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetStarter.Dtos.EVoucher;
using NetStarter.Services.IServiceCollection;
using System.Threading.Tasks;

namespace NetStarter.Controllers
{
    [Produces("application/json")]
    [Route("api/EVoucher")]
    public class EVoucherController : ControllerBase
    {
        private readonly IEvoucherService _service;
        public EVoucherController(IEvoucherService service)
        {
            _service = service; 
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllEVoucherList")]
        public async Task<IActionResult> GetAllRelatedCharacter()
        {
            return Ok(await _service.GetAllEVoucherWithRelatedUser());
        }

        [HttpGet]
        [Route("GetEVoucherById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _service.GetAllEVoucherByIdWithRelatedUser(id));
        }

        [HttpPost]
        [Route("EVoucherApply")] 

        public async Task<IActionResult> EVoucherApply (ApplyEVoucherDto inputModel)
        {
            return Ok(await _service.AppliedEVoucher(inputModel));
        }
    }
}

 
using Microsoft.AspNetCore.Mvc;
using NetStarter.Data.Models;
using NetStarter.Dtos.User;
using NetStarter.Services.IServiceCollection;
using System.Threading.Tasks;

namespace NetStarter.Controllers
{ 
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _service;
        public AuthController(IAuthenticationService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(UserRegisterDto inputModel)
        {
            ServiceResponse<int> response = await _service.Register(
                new User { UserName = inputModel.UserName }, inputModel.Password
                );

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserLoginDto inputModel)
        {
            ServiceResponse<string> response = await _service.Login(
                        inputModel.UserName,inputModel.Password
                );

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}
 
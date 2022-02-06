using NetStarter.Data.Models;
using NetStarter.Dtos.MkEmployee;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NetStarter.Services.IServiceCollection
{
    public interface IMkEmployeeService
    {

        Task<ServiceResponse<List<GetMkEmployeeDto>>> AddEmployeeWithRelatedCompany(AddMkEmployeeDto inputModel);
        Task<ServiceResponse<List<GetMkEmployeeDto>>> GetAllMkEmployeeRelatedWithCompany();
        Task<ServiceResponse<GetMkEmployeeDto>> GetMkEmployeeByIdRelatedWithCompany(int id);
        Task<ServiceResponse<GetMkEmployeeDto>> UpdateMKEmployee(UpdateMkEmployeeDto inputModel);
        Task<ServiceResponse<GetMkEmployeeDto>> DeleteMKEmployee(int id);
    }
}

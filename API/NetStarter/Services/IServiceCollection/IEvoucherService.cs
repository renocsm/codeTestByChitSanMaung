using NetStarter.Data.Models;
using NetStarter.Dtos.EVoucher;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NetStarter.Services.IServiceCollection
{
    public interface IEvoucherService
    {

        Task<ServiceResponse<List<GetEVoucherDto>>> GetAllEVoucherWithRelatedUser();

        Task<ServiceResponse<GetEVoucherDto>> GetAllEVoucherByIdWithRelatedUser(int id);

        Task<ServiceResponse<GetEVoucherDto>> AppliedEVoucher(ApplyEVoucherDto inputModel);

    }
}

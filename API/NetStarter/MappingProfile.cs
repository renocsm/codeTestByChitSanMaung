using AutoMapper;
using NetStarter.Data.Models;
using NetStarter.Dtos.Character;
using NetStarter.Dtos.EVoucher;
using NetStarter.Dtos.Fight;
using NetStarter.Dtos.MkEmployee;
using NetStarter.Dtos.Skill;
using NetStarter.Dtos.TicketOrders;
using NetStarter.Dtos.Weapon;
using System.Linq;

namespace NetStarter
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<Character, GetCharacterDto>()
                .ForMember(x => x.Skills,
                c => c.MapFrom(c => c.CharacterSkills.Select(cs => cs.Skill)));
                
            CreateMap<AddCharacterDto, Character>();
            CreateMap<UpdateCharacterDto, Character>();
            CreateMap<Weapon, GetWeaponDto>();
            CreateMap<AddSkillDto,Skill>();
            CreateMap<Skill, GetSkillDto>();
            CreateMap<Character, HightScoreDto>();

            //MKEmployee
            CreateMap<AddMkEmployeeDto,MkEmployee>();
            CreateMap<MkEmployee, GetMkEmployeeDto>();

            //TicketOrder
            CreateMap<AddTicketOrderDto,TicketOrder>();
            CreateMap<TicketOrder, GetTicketOrderDto>();

            //EVoucher
            CreateMap<OrderEvocher,GetEVoucherDto>();
        }
    }
}

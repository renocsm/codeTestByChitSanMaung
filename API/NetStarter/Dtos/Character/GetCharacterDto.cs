using NetStarter.Data.Enum;
using NetStarter.Dtos.Skill;
using NetStarter.Dtos.Weapon;
using System.Collections.Generic;

namespace NetStarter.Dtos.Character
{
    public class GetCharacterDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "Frodo";
        public int HitPoints { get; set; } = 100;
        public int Strength { get; set; } = 10;
        public int Defense { get; set; } = 10;
        public int Intelligence { get; set; } = 10;
        public Rpg Rpg { get; set; } = Rpg.Knight;

        public GetWeaponDto Weapon { get; set; }
        public List<GetSkillDto> Skills { get; set; }
    }
}

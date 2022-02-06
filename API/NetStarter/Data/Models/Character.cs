using NetStarter.Data.Enum;
using System.Collections.Generic;

namespace NetStarter.Data.Models
{
    public class Character
    {
        public int Id { get; set; }

        public string Name { get; set; } = "Frodo";

        public int HitPoints { get; set; } = 100;

        public int Strength { get; set; } = 10;

        public int Defense { get; set; } = 10;

        public int MyProperty { get; set; } = 10;

        public Rpg Rpg { get; set; } = Rpg.Knight;

        public int Intelligence { get; set; } = 10;

        public int Fights { get; set; }

        public int Victories  { get; set; }

        public int Defeats { get; set; }
        // relationship
        public User User { get; set; }

        public Weapon Weapon { get; set; }

        public List<CharacterSkill> CharacterSkills { get; set; }
    }
}

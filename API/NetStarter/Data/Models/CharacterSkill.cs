namespace NetStarter.Data.Models
{
    public class CharacterSkill
    {
        public int CharacterId { get; set; }
        public Character Character { get; set; }

        public int SKillId { get; set; }
        public Skill Skill { get; set; }
    }
}

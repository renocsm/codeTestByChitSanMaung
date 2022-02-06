namespace NetStarter.Data.Models
{
    public class Weapon
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Damage { get; set; }

        //foreign Key Ref for one to rs with character
        public int CharacterId { get; set; } 
        public Character Character { get; set; }
    }
}

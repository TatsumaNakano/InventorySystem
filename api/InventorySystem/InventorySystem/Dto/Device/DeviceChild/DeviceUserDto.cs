namespace InventorySystem.Dto
{
    public class DeviceUserDto
    {
        public int Id { get; set; }

        public string UserId { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string KanaFirstName { get; set; } = null!;

        public string KanaLastName { get; set; } = null!;

        public int SexId { get; set; }

        public string TelNumber { get; set; } = null!;

        public string Email { get; set; } = null!;

        public int IsAdmin { get; set; }

        public string? Remarks { get; set; }

        public int Deactivated { get; set; }

    }
}

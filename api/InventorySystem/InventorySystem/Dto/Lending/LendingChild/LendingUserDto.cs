namespace InventorySystem.Dto
{
    public class LendingUserDto
    {
        public int Id { get; set; }

        public string UserId { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string KanaFirstName { get; set; } = null!;

        public string KanaLastName { get; set; } = null!;

        public DateTime? Birthday { get; set; }

        public int? AgeDeprecated { get; set; }

        public int SexId { get; set; }

        public int? GenderId { get; set; }

        public string TelNumber { get; set; } = null!;

        public string Email { get; set; } = null!;

        public int PositionId { get; set; }

        public int DepartmentId { get; set; }

        public int IsAdmin { get; set; }

        public string? Remarks { get; set; }

        public int Deactivated { get; set; }

        public DateTime RegistrationDate { get; set; }

        public DateTime UpdateDate { get; set; }

        public DateTime? LeftDate { get; set; }
    }
}

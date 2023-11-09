using InventorySystem.Models;

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

        public string TelNumber { get; set; } = null!;

        public string Email { get; set; } = null!;

        public int IsAdmin { get; set; }

        public string? Remarks { get; set; }

        public int Deactivated { get; set; }

        public DateTime RegistrationDate { get; set; }

        public DateTime UpdateDate { get; set; }

        public DateTime? LeftDate { get; set; }

        public virtual DepartmentDto Department { get; set; } = null!;

        public virtual GenderDto? Gender { get; set; }

        public virtual PositionDto Position { get; set; } = null!;

        public virtual SexDto Sex { get; set; } = null!;
    }
}

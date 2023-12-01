using InventorySystem.Models;

namespace InventorySystem.Dto
{
    public class LendingDto
    {
        public int Id { get; set; }

        public DateTime RentalStart { get; set; }

        public DateTime RentalEnd { get; set; }

        public DateTime? ReturnedDate { get; set; }

        public int DeleteFlag { get; set; }

        public int DeviceId { get; set; }

        public int UserId { get; set; }

        public string? Remarks { get; set; }

        public string? TempId { get; set; }

        public virtual LendingDeviceDto Device { get; set; } = null!;

        public virtual LendingUserDto User { get; set; } = null!;
    }
}

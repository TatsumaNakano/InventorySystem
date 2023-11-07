using InventorySystem.Models;

namespace InventorySystem.Dto
{
    public class LendingDto
    {
        public int Id { get; set; }

        public DateTime RentalStart { get; set; }

        public DateTime RentalEnd { get; set; }

        public int DeleteFlag { get; set; }

        public virtual LendingDeviceDto Device { get; set; } = null!;

        public virtual LendingUserDto User { get; set; } = null!;
    }
}

using InventorySystem.Models;

namespace InventorySystem.Dto
{
    public class DeviceLendingDto
    {
        public int Id { get; set; }

        public DateTime RentalStart { get; set; }

        public DateTime RentalEnd { get; set; }

        public int DeleteFlag { get; set; }

    }
}

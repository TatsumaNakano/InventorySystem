using InventorySystem.Models;

namespace InventorySystem.Dto
{
    public class LendingEditDto
    {
        public DateTime RentalStart { get; set; }

        public DateTime RentalEnd { get; set; }

        public int DeleteFlag { get; set; }

        public int DeviceId { get; set; }

        public int UserId { get; set; }

        public string? Remarks { get; set; }

        public string TempId { get; set; }

    }
}

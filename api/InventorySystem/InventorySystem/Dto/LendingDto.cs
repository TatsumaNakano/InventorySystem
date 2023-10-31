namespace InventorySystem.Dto
{
    public class LendingDto
    {
        public int Id { get; set; }

        public int DeviceId { get; set; }

        public int UserId { get; set; }

        public DateTime RentalStart { get; set; }

        public DateTime RentalEnd { get; set; }

        public int DeleteFlag { get; set; }
    }
}

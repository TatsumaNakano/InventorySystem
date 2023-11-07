using InventorySystem.Models;

namespace InventorySystem.Dto
{
    public class LendingDeviceDto
    {
        public int Id { get; set; }

        public string DeviceId { get; set; } = null!;

        public string? OldName { get; set; }

        public int BrokenFlag { get; set; }

        public DateTime LeaseStartDate { get; set; }

        public DateTime LeaseEndDate { get; set; }

        public DateTime? InventoryDate { get; set; }

        public string? Remarks { get; set; }

        public int DeleteFlag { get; set; }

        public DateTime RegistrationDate { get; set; }

        public DateTime UpdateDate { get; set; }

        public int? Memory { get; set; }

        public int? Capacity { get; set; }

        public int? HasGpu { get; set; }

        public virtual DeviceTypeDto DeviceType { get; set; } = null!;
        public virtual DeviceMakerDto? Maker { get; set; }
        public virtual OperationSystemDto? Os { get; set; }
        public virtual StoragePlaceDto Place { get; set; } = null!;


    }
}

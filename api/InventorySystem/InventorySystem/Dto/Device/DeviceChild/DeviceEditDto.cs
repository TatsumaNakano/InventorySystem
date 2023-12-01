using InventorySystem.Models;
using System.Text.Json.Serialization;

namespace InventorySystem.Dto
{
    public class DeviceEditDto
    {
        public string DeviceId { get; set; } = null!;
        //public string? OldName { get; set; }

        public int DeviceTypeId { get; set; }

        public int BrokenFlag { get; set; }

        public DateTime LeaseStartDate { get; set; }

        public DateTime LeaseEndDate { get; set; }

        public DateTime? InventoryDate { get; set; }

        public string? Remarks { get; set; }

        public int DeleteFlag { get; set; }

        public DateTime RegistrationDate { get; set; }

        public DateTime UpdateDate { get; set; }

        public int PlaceId { get; set; }

        public int? MakerId { get; set; }

        public int? OsId { get; set; }

        public int? Memory { get; set; }

        public int? Capacity { get; set; }

        public int? HasGpu { get; set; }

        public string? TempId { get; set; }
    }
}

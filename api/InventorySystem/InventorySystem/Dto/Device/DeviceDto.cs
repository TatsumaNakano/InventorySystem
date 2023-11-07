﻿using InventorySystem.Models;
using System.Text.Json.Serialization;

namespace InventorySystem.Dto
{
    public class DeviceDto
    {
        public int Id { get; set; }

        public string DeviceId { get; set; } = null!;

        public string? OldName { get; set; }

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

        public int? CurrentUserId { get; set; }

        public virtual DeviceUserDto? CurrentUser { get; set; }
        public virtual DeviceTypeDto DeviceType { get; set; } = null!;

        public virtual ICollection<LendingDto> Lendings { get; set; } = new List<LendingDto>();
        public virtual DeviceMakerDto? Maker { get; set; }
        public virtual OperationSystemDto? Os { get; set; }
        public virtual StoragePlaceDto Place { get; set; } = null!;


    }
}

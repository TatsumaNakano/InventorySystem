using System;
using System.Collections.Generic;

namespace InventorySystem.Models;

public partial class Device
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

    public virtual User? CurrentUser { get; set; }

    public virtual DeviceType DeviceType { get; set; } = null!;

    public virtual ICollection<Lending> Lendings { get; set; } = new List<Lending>();

    public virtual DeviceMaker? Maker { get; set; }

    public virtual OperationSystem? Os { get; set; }

    public virtual StoragePlace Place { get; set; } = null!;
}

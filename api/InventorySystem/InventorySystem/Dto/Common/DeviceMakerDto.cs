using InventorySystem.Dto;
using System;
using System.Collections.Generic;

namespace InventorySystem.Models;

public partial class DeviceMakerDto
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<DeviceDto> Devices { get; set; } = new List<DeviceDto>();
}

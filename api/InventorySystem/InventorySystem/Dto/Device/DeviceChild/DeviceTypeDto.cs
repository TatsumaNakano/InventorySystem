using InventorySystem.Dto;
using System;
using System.Collections.Generic;

namespace InventorySystem.Models;

public partial class DeviceTypeDto
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? DevicePrefix { get; set; }

    public int NextVersion { get; set; }

}

using System;
using System.Collections.Generic;

namespace InventorySystem.Models;

public partial class DeviceType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? DevicePrefix { get; set; }

    public int NextVersion { get; set; }

    public string Emoji { get; set; }

    public virtual ICollection<Device> Devices { get; set; } = new List<Device>();
}

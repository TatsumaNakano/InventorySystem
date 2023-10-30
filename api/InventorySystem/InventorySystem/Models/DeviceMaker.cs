using System;
using System.Collections.Generic;

namespace InventorySystem.Models;

public partial class DeviceMaker
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Device> Devices { get; set; } = new List<Device>();
}

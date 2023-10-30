using System;
using System.Collections.Generic;

namespace InventorySystem.Models;

public partial class Sex
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}

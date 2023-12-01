using System;
using System.Collections.Generic;

namespace InventorySystem.Models;

public partial class Lending
{
    public int Id { get; set; }

    public int DeviceId { get; set; }

    public int UserId { get; set; }

    public DateTime RentalStart { get; set; }

    public DateTime RentalEnd { get; set; }

    public int DeleteFlag { get; set; }

    public string? Remarks { get; set; }

    public string? TempId { get; set; }

    public virtual Device Device { get; set; } = null!;

    public virtual User User { get; set; } = null!;



}

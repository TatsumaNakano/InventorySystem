﻿using InventorySystem.Dto;
using System;
using System.Collections.Generic;

namespace InventorySystem.Models;

public partial class UserGenderDto
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

}

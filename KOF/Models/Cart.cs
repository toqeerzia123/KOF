﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KOF.Models
{
    public class Cart : TrackableEntityBase<int>
    {
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int Quantity { get; set; }
        public int PerUnitPrice { get; set; }
        public int PerUnitCost { get; set; }
        public int TotalPrice { get; set; }
        public int TotalCost { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        [JsonIgnore]
        public virtual Product Product { get; set; }
    }
}

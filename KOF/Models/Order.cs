using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KOF.Models
{
    public class Order:TrackableEntityBase<int>
    {
        public string OrderNumber { get; set; }
        public string OrderType { get; set; }
        public string OrderFrom { get; set; }
        public string OrderStatus { get; set; }
        public int TotalAmount { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        public IList<OrderItem> OrderItems { get; set; }
        public IList<Product> Products { get; set; }
    }
}

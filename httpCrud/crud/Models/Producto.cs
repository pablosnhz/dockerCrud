using System;
using System.Collections.Generic;

namespace crud.Models
{
    public partial class Producto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal? Price { get; set; }
    }
}

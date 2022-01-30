using KOF.Context;
using KOF.Models;
using KOF.Services.GenericService;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KOF.Services.InventoryService
{
    public class InventoryService: GenericRepository<Inventory>, IInventoryService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ApplicationDbContext _context;
        public InventoryService(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment) : base(context)
        {
            _webHostEnvironment = webHostEnvironment;
            _context = context;
        }

        public async Task<int> addtocart(int inventoryid, int productid, int Qty, int userid,string unit)
        {
            var inv = _context.Inventories.Where(x=>x.Id==inventoryid).SingleOrDefault();
            Cart obj = new Cart
            {
                ProductId = productid,
                UserId = 1,
                Quantity = Qty,
                PerUnitPrice = inv.PricePerUnit,
                TotalPrice = inv.PricePerUnit * Qty

            };
         await    _context.AddAsync(obj);
       await     _context.SaveChangesAsync();
            return 0;
        }

        public async Task<object> CategorywiseInventory(int id)
        {
            var data = await _context.Inventories.Where(a => a.Status == true).Select(a =>new  { 
                 invinfo=a,
                 productinfo=a.Product,
                 categoryinfo=a.Product.Category

            }).ToListAsync();
            return data;
        }

        public  async Task<object> GetInventory()
        {
            var data = await _context.Inventories.Select(x=> new { 
                  inventory=x,
                  suppliername=x.Supplier.Name,
                  productinfo=_context.Products.Where(y=>y.Id==x.ProductId).Select(y=> new {
                  name=y.Name,
                  categoryname=y.Category.Name,
                  
                  }).SingleOrDefault(),
                 

            }).ToListAsync();

            return data;
        }

        public async Task<int> removecart(int id)
        {
         
            try
            {
                var data =  _context.Carts.Find(id);
                _context.Carts.Remove(data);
                 _context.SaveChanges();
            }
            catch (Exception ex)
            {
                var dat = ex.Message;
                throw;
            }
     
            return 0;

        }
    }
}

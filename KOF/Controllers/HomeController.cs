using KOF.Models;
using KOF.Services.InventoryService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace KOF.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly IInventoryService _inventoryService;
      
        public HomeController(ILogger<HomeController> logger, IInventoryService inventoryService)
        {
            _logger = logger;
            _inventoryService = inventoryService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ContactUs()
        {
            return View();
        }
        public IActionResult ProductListView()
        {
            return View();
        }
        public async Task<IActionResult> ProductGridView(int id)
        {
            //var data = await _inventoryService.CategorywiseInventory(id);
            //ViewBag.Categorywiseproducts = data;
            ViewBag.id = id;
                return View();
        }
        public async Task<IActionResult> Productdetail(int id)
        {
            //var data = await _inventoryService.CategorywiseInventory(id);
            //ViewBag.Categorywiseproducts = data;
            ViewBag.InventoryId = id;
            return View();
        }


        public IActionResult About()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Addtocard(int inventoryid,int productid,int Qty,int userid,string unit)
        {
            var data = await _inventoryService.addtocart( inventoryid,  productid,  Qty,  userid, unit);
            return RedirectToAction("Productdetail",new {id=productid });
        }
        public IActionResult MyAccount()
        {
            return View();
        }
        public IActionResult  removecart(int id)
        {
       
            _inventoryService.removecart(id);
            return RedirectToAction("index");
   
        }
        public IActionResult WishList()
        {
            return View();
        }
        public IActionResult Checkout()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

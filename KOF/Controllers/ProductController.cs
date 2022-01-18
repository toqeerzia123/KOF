using KOF.DTO_S;
using KOF.Services.ProductImageService;
using KOF.Services.ProductService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KOF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly IProductService _productService;
        private readonly IProductImageService _productImageService;
        public ProductController(IProductService productService, IProductImageService productImageService)
        {
            _productService = productService;
            _productImageService = productImageService;
        }
        [HttpGet("getproducts")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var data = await _productService.GetAllAsync();
                return Ok(data);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpPost("Postproducts")]
        public async Task<IActionResult> Post([FromForm] ProductDto dto)
        {
            try
            {
                var data = await _productService.CreateProduct(dto);
                if (data == "Success")
                {
                    return Ok(new { response = data });
                }
                return BadRequest(new { response = data });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpPut("Updateproduct")]
        public async Task<IActionResult> Put([FromBody] ProductDto product)
        {
            try
            {
                var data = await _productService.UpdateProduct(product);
                if (data == "success")
                {
                    return Ok(new { response = data });
                }
                return BadRequest(new { response = data });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpPut("UpdateProductImage")]
        public async Task<IActionResult> updateImage([FromForm] ProductDto dto)
        {
            try
            {
                var data = await _productImageService.UpdateProductImages(dto);
                if (data == "success")
                {
                    return Ok(new { response = data });
                }
                return BadRequest(new { response = data });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        //[HttpDelete("RemoveCategory")]
        //public async Task<IActionResult> Delete([FromBody] int id)
        //{
        //    try
        //    {
        //        Category cat = new Category()
        //        {
        //            Id = id
        //        };
        //        await _categoryService.DeleteAsync(cat.Id);
        //        return Ok(new { response = "Deleted Successfully" });
        //    }
        //    catch (Exception ex)
        //    {

        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}

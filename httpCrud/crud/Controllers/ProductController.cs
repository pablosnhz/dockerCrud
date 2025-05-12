using crud.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace crud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly fakesContext _dbFakesContext;

        public ProductController(fakesContext dbFakesContext)
        {
            _dbFakesContext = dbFakesContext;
        }

        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> List()
        {
            var list = await _dbFakesContext.Productos.ToListAsync();
            return Ok(list);
        }

        [HttpGet]
        [Route("ListById/{id}")]
        public async Task<IActionResult> ListById(int id)
        {
            var list = await _dbFakesContext.Productos.FindAsync(id);

            if(list == null)
            {
                return BadRequest();
            }

            return Ok(list);
        }

        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AgregarProductos(Producto producto)
        {
            _dbFakesContext.Productos.Add(producto);
            await _dbFakesContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [Route("modProduct/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Producto Producto)
        {
           if(id != Producto.Id)
            {
                return BadRequest();
            }

            var productUpdate = await _dbFakesContext.Productos.FindAsync(id);

            if(productUpdate == null)
            {
                return BadRequest();
            }

            productUpdate.Name = Producto.Name;
            productUpdate.Price = Producto.Price;

            await _dbFakesContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("deleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var findProduct = await _dbFakesContext.Productos.FindAsync(id);
            if(findProduct == null)
            {
                return NotFound();
            }

            _dbFakesContext.Productos.Remove(findProduct);
            await _dbFakesContext.SaveChangesAsync(); 
            
            return NoContent();
        }
    }
}

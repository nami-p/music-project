using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace final_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IService<ReviewDTO> service;

        public ReviewController(IService<ReviewDTO> service)
        {
            this.service = service;
        }

        // GET: api/<ReviewController>
        [HttpGet]
        public async Task<List<ReviewDTO>> Get()
        {
            return await service.getAllAsync();
        }

        // GET api/<ReviewController>/5
        [HttpGet("{id}")]
        public async Task<ReviewDTO> Get(int id)
        {
            return await service.getAsync(id);
        }

        // POST api/<ReviewController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ReviewDTO Review)
        {
            return Ok( await service.AddAsync(Review));
        }

        // PUT api/<ReviewController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] ReviewDTO r)
        {
            await service.updateAsync(id, r);
        }

        // DELETE api/<ReviewController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.deleteAsync(id);
        }
    }
}

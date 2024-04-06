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
                var allReviews = await service.getAllAsync();
                foreach (var review in allReviews)
                {
                    review.User.ProfilImage = GetImage(review.User.ProfilImage);
                }
                return allReviews;    
        }

        // GET api/<ReviewController>/5
        [HttpGet("{id}")]
        public async Task<ReviewDTO> Get(int id)
        {
            return await service.getAsync(id);
        }
        private string GetImage(string ImageUrl)
        {
            var path = Path.Combine(Environment.CurrentDirectory, "images/", ImageUrl);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string imageBase64 = Convert.ToBase64String(bytes);
            string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
            return image;
        }
        // POST api/<ReviewController>
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ReviewDTO Review)
        {
            Review.Date=DateTime.Now;
            return Ok( await service.AddAsync(Review));
        }
        [HttpPost("joinReviewAndPlayback")]
        public async Task<List<ReviewDTO>> Post([FromForm] long  songId)
        {
            try
            {
                
                    return await service.JoinPlaybacksAndReviews(songId);

            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        // PUT api/<ReviewController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromForm] ReviewDTO r)
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

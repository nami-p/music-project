using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System.Security.Policy;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace final_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IService<CategoryDTO> service;

        public CategoryController(IService<CategoryDTO> service)
        {
            this.service = service;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<List<CategoryDTO>> Get()
        {
            var allCategories= await service.getAllAsync();
            foreach(var category in allCategories)
            {
                category.Image=GetImage(category.Image);
                foreach (var song in category.Songs)
                {
                    song.Image = GetImage(song.Image);
                    song.SongName = song.Song1;
                    song.Song1 = GetSong(song.Song1);
                }
            }
            return allCategories.ToList<CategoryDTO>(); 
        }

        [HttpGet("getSong/{songName}")]
        public string GetSong(string songName)
        {
            var path = Path.Combine(Environment.CurrentDirectory, "songs/", songName);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string songBase64 = Convert.ToBase64String(bytes);
            string song = string.Format("data:audio/mp3;base64,{0}", songBase64);
            return song;
        }
        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public async Task<CategoryDTO> Get(long id)
        {
            var category =await service.getAsync(id);
            category.Image = GetImage(category.Image);
            return(CategoryDTO)category;     
        }

        // POST api/<CategoryController>
        //[HttpPost]
        //public async Task Post([FromBody] CategoryDTO Category)
        //{
        //    await service.AddAsync(Category);
        //}

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task Put(long id, [FromForm] CategoryDTO r)
        {
            var myPath = Path.Combine(Environment.CurrentDirectory + "/images/" + r.FileImage.FileName);
            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                r.FileImage.CopyTo(fs);
                fs.Close();
            }

            r.Image = r.FileImage.FileName;
            await service.updateAsync(id, r);
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public async Task Delete(long id)
        {
            await service.deleteAsync(id);
        }
        [HttpGet("getImage/{ImageUrl}")]
        public string GetImage(string ImageUrl)
        {
            var path = Path.Combine(Environment.CurrentDirectory, "images/", ImageUrl);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string imageBase64 = Convert.ToBase64String(bytes);
            string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
            return image;
        }
        // POST api/<CategoriessController>
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] CategoryDTO category)
        {

            var myPath = Path.Combine(Environment.CurrentDirectory + "/images/" + category.FileImage.FileName );
            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                category.FileImage.CopyTo(fs);
                fs.Close();
            }

            category.Image = category.FileImage.FileName;
            return Ok( await service.AddAsync(category));
        }

    }
}

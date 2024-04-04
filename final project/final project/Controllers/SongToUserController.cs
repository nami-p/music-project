using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace final_project.Controllers
{
    [Route("sharedMusic/[controller]")]
    [ApiController]
    public class SongToUserController : ControllerBase
    {
        private readonly IServiceExetention<SongToUserDTO> service;

        public SongToUserController(IServiceExetention<SongToUserDTO> service)
        {
            this.service = service;
        }

        // GET: api/<SongToUserController>
        [HttpGet]
        public async Task<List<SongToUserDTO>> Get()
        {

            return await service.getAllAsync();
        }
        [HttpGet("User/{UserId}")]
        public async Task<List<SongToUserDTO>> GetByUser(long UserId)
        {
            var allsongsToUser = await service.GetAllPlayingsOfUser(UserId); ;
            foreach (var song in allsongsToUser)
            {
                if (!song.Song.Image.StartsWith("https://pixabay.com/get/"))
                {
                    song.Song.Image = GetImage(song.Song.Image);
                }
                song.Song.SongName = song.Song.Song1;
                song.Song.Song1 = GetSong(song.Song.Song1);
            }
            return allsongsToUser.ToList<SongToUserDTO>();
        }
        //[HttpGet("GetByUserAndCategory/{UserId}/{CategoryId}")]
        //public async Task<List<SongToUserDTO>> GetByUserAndCategory(long UserId, long CategoryId)
        //{
        //    return await service.GetByUserAndCategory(UserId, CategoryId);
        //}

        [HttpGet("GetByUserAndSong/{UserId}/{SongId}")]
        public async Task<SongToUserDTO> GetByUserAndSong(long UserId, long SongId)
        {
            return await service.GetByUserAndSong(UserId, SongId);
        }

        // GET: api/SongToUser/5
        [HttpGet("{id}")]
        public async Task<SongToUserDTO> Get(long id)
        {
            return await service.getAsync(id);
        }

        // POST api/<SongToUserController>
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] SongToUserDTO SongToUser)
        {
           return Ok( await service.AddAsync(SongToUser));
        }

        // PUT api/<SongToUserController>/5
        [HttpPut("{id}")]
        public async Task Put(long id, [FromForm] SongToUserDTO r)
        {
            await service.updateAsync(id, r);
        }

        // DELETE api/<SongToUserController>/5
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
        [HttpGet("getSong/{songName}")]
        public string GetSong(string songName)
        {
            var path = Path.Combine(Environment.CurrentDirectory, "songs/", songName);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string songBase64 = Convert.ToBase64String(bytes);
            string song = string.Format("data:audio/mp3;base64,{0}", songBase64);
            return song;
        }
    }
}

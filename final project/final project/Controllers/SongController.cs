using Common.Entity;
using Entities.Entity;
using Microsoft.AspNetCore.Mvc;
using NAudio.Wave;
using Service.Interfaces;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace final_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private readonly IService<SongDTO> service;

        public SongController(IService<SongDTO> service)
        {
            this.service = service;
        }

        // GET: api/<SongController>
        [HttpGet]
        public async Task<List<SongDTO>> Get()
        {
            var allsongs = await service.getAllAsync();
            foreach (var song in allsongs)
            {
                song.Image = GetImage(song.Image);
                song.SongName = song.Song1;
                song.Song1 = GetSong(song.Song1);
            }
            return allsongs.ToList<SongDTO>();
        }

        // GET api/<SongController>/5
        [HttpGet("{id}")]
        public async Task<SongDTO> Get(int id)
        {
            //var song =
                return await service.getAsync(id);
            //song.Image = GetImage(song.Image);
            //return (SongDTO)song;
        }

        // POST api/<SongController>
        //[HttpPost]
        //public async Task Post([FromBody] SongDTO Song)
        //{
        //    await service.AddAsync(Song);
        //}

        // PUT api/<SongController>/5
        [HttpPut("UpdateSong/{id}")]
        public async Task Put(int id, [FromForm] SongDTO r)
        {
            if (r.FileImage != null)
            {
                var myPath = Path.Combine(Environment.CurrentDirectory + "/images/" + r.FileImage.FileName);
                using (FileStream fs = new FileStream(myPath, FileMode.Create))
                {
                    r.FileImage.CopyTo(fs);
                    fs.Close();
                }

                r.Image = r.FileImage.FileName;
            }
            
            await service.updateAsync(id, r);
        }

        // DELETE api/<SongController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
           SongDTO song= await service.getAsync(id);
           var path = Path.Combine(Environment.CurrentDirectory, "images/", song.Image);
         
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
        [HttpGet("downloadSong/{fileName}")]
        public IActionResult DownloadSong(string fileName)
        {
            // Define the path where the video is saved on the server
            var filePath = Path.Combine(Environment.CurrentDirectory, "songs/", fileName);

            // Check if the video file exists
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            // Read the video file as a byte array
            var fileBytes = System.IO.File.ReadAllBytes(filePath);

            // Set the content type header based on the file extension
            var fileExtension = Path.GetExtension(fileName).ToLowerInvariant();
            var contentType = "application/octet-stream"; // Default content type for binary files
            if (fileExtension == ".mp3")
            {
                contentType = "audio/mp3";
            }
            // Add other supported video file extensions and corresponding content types here

            // Return the file as a download attachment
            return File(fileBytes, contentType, fileName);
        }
        // POST api/<CategoriessController>
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] SongDTO songDTO)
        {
            // **Song Upload:**
            if (songDTO.FileSong == null || songDTO.FileSong.Length <= 0)
            {
                return BadRequest("No file uploaded.");
            }

            var songFileName = songDTO.FileSong.FileName;
            var filePath = Path.Combine(Environment.CurrentDirectory, "songs/", songFileName);

            try
            {
                // Save the song file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    songDTO.FileSong.CopyTo(stream);
                }

                // **Get song length (optional):**
                using (var reader = new Mp3FileReader(filePath))
                {
                    var songLengthInMilliseconds = reader.TotalTime.TotalMilliseconds;
                    var minutes = Math.Floor(songLengthInMilliseconds / 60000);
                    var seconds = Math.Floor((songLengthInMilliseconds % 60000) / 1000);

                    songDTO.Length = Math.Round(minutes + seconds / 100, 2);

                    Console.WriteLine("Song Length: {0:00}:{1:02}", minutes, seconds);
                }

            }
            catch (Exception ex)
            {
                // Handle song upload error (e.g., log the exception and return a bad request)
                return BadRequest("Failed to upload song.");
            }
            // **Image Upload:**
            if (songDTO.FileImage!=null)
            { 
                var imagePath = Path.Combine(Environment.CurrentDirectory + "/images/", songDTO.FileImage.FileName);
                try
                {
                    using (FileStream fs = new FileStream(imagePath, FileMode.Create))
                    {
                        songDTO.FileImage.CopyTo(fs);
                        fs.Close();
                    }
                    songDTO.Image = songDTO.FileImage.FileName;
                }
                catch (Exception ex)
                {
                    // Handle image upload error (e.g., log the exception and return a bad request)
                    return BadRequest("Failed to upload image.");
                }
            }
            else
            {
                // **Get audio image if no separate image:**
                //string audioImagePath = null;
                //try
                //{
                //    // Use a library like TagLib# to extract embedded image
                //    TagLib.File tagFile = TagLib.File.Create(filePath);
                //    TagLib.Tag tag = tagFile.Tag;
                //    if (tag.Pictures.Count() > 0)
                //    {
                //        TagLib.Picture picture = (TagLib.Picture)tag.Pictures[0];
                //        byte[] imageBytes = picture.Data.Data;
                //        audioImagePath = Path.Combine(Environment.CurrentDirectory, "images/", songFileName + ".jpg"); // Adjust extension as needed
                //        using (FileStream fs = new FileStream(audioImagePath, FileMode.Create))
                //        {
                //            fs.Write(imageBytes, 0, imageBytes.Length);
                //        }
                //    }
                //}
                //catch (Exception ex)
                //{
                //    // Handle image extraction error (e.g., log the exception)
                //}

                //songDTO.Image = audioImagePath;
                if (songDTO.Image == null)
                {
                    songDTO.Image = "logo.jpg";
                }
            }
           
            songDTO.SongName=songFileName;
            songDTO.Song1 = songFileName;
            songDTO.UploadDate = DateTime.Now;
            songDTO.RatingStars = 5;
            songDTO.NumOfPlays = 0;
            songDTO.NumOfRaters = 0;
            songDTO.NumOfDownloads = 0;
            songDTO.NumOfListeners = 0;
            songDTO.NumOfLikes = 0;
            songDTO.NumOfAddedToCollections = 0;
           

            try
            {
                return Ok(await service.AddAsync(songDTO));
            }
            catch (Exception ex)
            {
                // Handle service call error (e.g., log the exception and return an internal server error)
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
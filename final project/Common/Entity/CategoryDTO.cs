using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.AspNetCore.Http;


namespace Common.Entity
{
    public class CategoryDTO
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile FileImage { get; set; }
        public string? Image { get; set; }
        public virtual ICollection<SongDTO>? Songs { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entity
{
    public class Category
    {
        private long id;
        private string name;
        private string description;
        private string image;

        //public Category(long id, string name, string description, byte[] image)
        //{
        //    this.id = id;
        //    this.name = name;
        //    this.description = description;
        //    this.image = image;
        //}

        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get => description; set => description = value; }
        public string Image { get => image; set => image = value; }
        public virtual ICollection<Song> Songs { get; set; }

    }
}

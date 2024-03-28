using Entities.Entity;
using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IContext
    {
        public DbSet<Category> categories { get; set; }

        public DbSet<Review> reviews { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Song> songs { get; set; }
        public DbSet<SongToUser> Playbacks { get; set; }

        public Task save();

    }
}

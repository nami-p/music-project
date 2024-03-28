using Entities.Entity;
using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
namespace DataContext
{
    public class Db:DbContext,IContext
    {
        public DbSet<Category> categories { get; set; }

        public DbSet<Review> reviews { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Song> songs { get; set; }
        public DbSet<SongToUser> Playbacks { get; set; }
        public async Task save()
        {
           await SaveChangesAsync();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=DESKTOP-COMG2IE\\SQLEXPRESS;database=music;TrustServerCertificate=true;trusted_connection=true;");
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }

    }
}
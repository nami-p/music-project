using Entities.Entity;
using Microsoft.EntityFrameworkCore;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class SongRepository : IRepository<Song>
    {
        private readonly IContext _context;
        public SongRepository(IContext context)
        {
            this._context = context;
        }

        public async Task<Song> addItemAsync(Song item)
        {
            Song song = item;
            await _context.songs.AddAsync(item);
            await _context.save();
            return song;    
        }

        public async Task deleteAsync(long id)
        {
            Song song= await getAsync(id);
            if(song.Reviews!=null)song.Reviews.ToList().Clear();
            if(song.Playbacks!=null)song.Playbacks.ToList().Clear();
            _context.songs.Remove(song);
            await _context.save();
        }

        public async Task<Song> getAsync(long id)
        {
            //.Include(c => c.Playbacks)//
            return await _context.songs.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Song>> getAllAsync()
        {
            return await _context.songs.ToListAsync();
        }

        public async Task updateAsync(long id, Song item)
        {
            //_context.songs.Update(entity);
            var song = await this._context.songs.FirstOrDefaultAsync(x => x.Id == id);
            if (song != null)
            {
                if (item.Name != null) song.Name = item.Name;
                if (item.Description != null) song.Description = item.Description;
                if (item.Length != 0) song.Length = item.Length;
                if (item.Image != null) song.Image = item.Image;
                if (item.RatingStars != 0) song.RatingStars = item.RatingStars;
                if (item.NumOfPlays != 0) song.NumOfPlays = item.NumOfPlays;
                if (item.NumOfListeners != 0) song.NumOfListeners += item.NumOfListeners;
                if (item.NumOfLikes != 0) song.NumOfLikes += item.NumOfLikes;
                if (item.NumOfAddedToCollections != 0) song.NumOfAddedToCollections += item.NumOfAddedToCollections;
                if (item.NumOfDownloads != 0) song.NumOfDownloads += item.NumOfDownloads;
                if (item.UploadDate != DateTime.MinValue) song.UploadDate = item.UploadDate;
                if (item.NumOfRaters != 0) song.NumOfRaters = item.NumOfRaters;
                if (item.Song1 != null) song.Song1 = item.Song1;
                if (item.Fear != 0) song.Fear = item.Fear;
                if (item.Surprise != 0) song.Surprise = item.Surprise;
                if (item.Disgust != 0) song.Disgust = item.Disgust;
                if (item.Happy != 0) song.Happy = item.Happy;
                if (item.Sad != 0) song.Sad = item.Sad;
                if (item.Angry != 0) song.Angry = item.Angry;
                if (item.CategoryId != 0) song.CategoryId = item.CategoryId;
                if (item.UserId != 0) song.UserId = item.UserId;
                if (item.Neutral != 0) song.Neutral = item.Neutral;
            }
            
            await _context.save();
        }
    }
    //public void Add(Song item)
    //{
    //    this.context.songs.Add(item);
    //    this.context.save();
    //}

    //public void Delete(Song item)
    //{
    //   this.context.songs.Remove(item);
    //    this.context.save();
    //}

    //public List<Song> GetAll()
    //{
    //    return this.context.songs.ToList();
    //}

    //public Song GetById(int id)
    //{
    //    return this.context.songs.FirstOrDefault(x => x.Id == id);
    //}

    //public void Update(int id, Song item)
    //{
    //    var song = this.GetById(id);    
    //    song.Length = item.Length;
    //    song.user=item.user;
    //    song.NumOfPlays=item.NumOfPlays;    
    //    song.RatingStars=item.RatingStars;  
    //    song.NumOfRaters=item.NumOfRaters;
    //    song.category=item.category;    
    //    song.Emotions=item.Emotions;
    //    song.UploadDate = item.UploadDate;
    //    song.Image = item.Image;
    //    song.Song1 = item.Song1;
    //    this.context.save();
    //}
}

using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class SongToUserRepository: IRepository<SongToUser>
    {
        private readonly IContext _context;
        public SongToUserRepository(IContext context)
        {
            _context = context;
        }
        public async Task<SongToUser> addItemAsync(SongToUser item)
        {
            SongToUser songTouser = item;
            await _context.Playbacks.AddAsync(item);
            await _context.save();
            return songTouser;
        }

        public async Task deleteAsync(long id)
        {
            _context.Playbacks.Remove(await getAsync(id));
            await _context.save();
        }

        public async Task<SongToUser> getAsync(long id)
        {
            return await _context.Playbacks.FirstOrDefaultAsync(x => x.Id == id);
        }

        //public async Task<List<SongToUser>> getAllOfUser(long id)
        //{
        //    return await _context.Playbacks.Where(x => x.UserId == id).ToListAsync();
        //}
        //async Task<IEnumerable<SongToUser>> IRepository<SongToUser>.getAllOfUser(long userId)
        //{
        //    return await _context.Playbacks.Where(x => x.UserId == userId).ToListAsync();
        //}
        public async Task<List<SongToUser>> getAllAsync()
        {
            return await _context.Playbacks.Include(c => c.Song).Include(s=>s.Song.user).ToListAsync();
        }

        public async Task updateAsync(long id, SongToUser item)
        {
            //_context.Playbacks.Update(entity);
            var playing = await this._context.Playbacks.FirstOrDefaultAsync(x => x.Id == id);
            if(item.Count !=0)playing.Count += item.Count;
            if (item.Love!=null ) playing.Love =item.Love;
            if (item.AddToCollection!=null) playing.AddToCollection = item.AddToCollection;
            await _context.save();
        }
    }




    //private readonly IContext context;
    //SongToUserRepository(IContext context)
    //{
    //    this.context = context;
    //}

    //void IRepository<SongToUser>.Add(SongToUser item)
    //{
    //    this.context.Playbacks.Add(item);
    //    this.context.save();
    //}

    //void IRepository<SongToUser>.Delete(SongToUser item)
    //{
    //    this.context.Playbacks.Remove(item);
    //    this.context.save();
    //}

    //List<SongToUser> IRepository<SongToUser>.GetAll()
    //{
    //    return this.context.Playbacks.ToList();
    //}

    //SongToUser IRepository<SongToUser>.GetById(int id)
    //{
    //    return this.context.Playbacks.FirstOrDefault(x => x.Id == id);
    //}

    //void IRepository<SongToUser>.Update(int id, SongToUser item)
    //{
    //    var playing = this.context.Playbacks.FirstOrDefault(x => x.Id == id);
    //    playing.SongId = item.SongId;
    //    playing.Count = item.Count;
    //    playing.UserId = item.UserId;
    //    this.context.save();
    //}
}

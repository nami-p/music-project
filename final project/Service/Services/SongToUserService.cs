using AutoMapper;
using Common.Entity;
using Entities.Entity;
using Repository.Entity;
using Repository.Interface;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class SongToUserService : IServiceExetention<SongToUserDTO>
    {
        private readonly IMapper mapper;
        private readonly IRepository<SongToUser> repository;
        private readonly IRepository<Song> repositorySong;
        public SongToUserService(IRepository<SongToUser> repository,IRepository<Song> repositorySong, IMapper mapper)
        {
            this.repository = repository;
            this.repositorySong = repositorySong;
            this.mapper = mapper;
        }
        public async Task<SongToUserDTO> AddAsync(SongToUserDTO entity)
        {
            var playback= mapper.Map<SongToUserDTO>( await repository.addItemAsync(mapper.Map<SongToUser>(entity)));
            Song s= new Song();
            s.NumOfListeners = 1;
            if (entity.Love == true)
                s.NumOfLikes = 1;
            //else
            //    s.NumOfLikes = -1;
            if(entity.AddToCollection == true)
                s.NumOfAddedToCollections = 1; 
            //else
            //    s.NumOfAddedToCollections = -1; 
            await repositorySong.updateAsync(Convert.ToInt64(entity.SongId),s);
            return playback;
        }

        public async Task deleteAsync(long id)
        {
            await repository.deleteAsync(id);
        }

        public async Task<SongToUserDTO> getAsync(long id)
        {
            return mapper.Map<SongToUserDTO>(await repository.getAsync(id));
        }

        public async Task<List<SongToUserDTO>> getAllAsync()
        {
            return mapper.Map<List<SongToUserDTO>>(await repository.getAllAsync());
        }

        public async Task updateAsync(long id, SongToUserDTO entity)
        {
            await repository.updateAsync(id, mapper.Map<SongToUser>(entity));
            Song s = new Song();
            if (entity.UpdateNeeded == "like")
            {
                if (entity.Love == true)
                     s.NumOfLikes = 1;
                else
                     s.NumOfLikes = -1;
            }
            else
            {
                if (entity.UpdateNeeded == "addToCollection")
                {
                    if (entity.AddToCollection == true)
                        s.NumOfAddedToCollections = 1;
                    else
                        s.NumOfLikes = -1;
                }
            }
            await repositorySong.updateAsync(Convert.ToInt64(entity.SongId), s);
        }

        public async Task<List<SongToUserDTO>> GetAllPlayingsOfUser(long id)
        {
            var allPlayings = await repository.getAllAsync();
            return mapper.Map<List<SongToUserDTO>>(allPlayings.Where(x => x.UserId == id));
        }

        //public async Task<List<SongToUserDTO>> GetByUserAndCategory(long userId,long CategoryId)
        //{
        //    var allplaybacks= await repository.getAllAsync();
        //    return mapper.Map<List<SongToUserDTO>>(allplaybacks.Where(x => x.UserId == userId &&x.Song.CategoryId==CategoryId));
        //} 
        public async Task<SongToUserDTO> GetByUserAndSong(long userId,long songId)
        {
            var allplaybacks= await repository.getAllAsync();
            return mapper.Map<SongToUserDTO>(allplaybacks.FirstOrDefault(x => x.UserId == userId &&x.SongId==songId));
        }
    }
}


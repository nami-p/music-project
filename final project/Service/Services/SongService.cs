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
    public class SongService:IService<SongDTO>
    {
        //המרה ממחלקה
        private readonly IMapper mapper;
        private readonly IRepository<Song> repository;
        public SongService(IRepository<Song> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<SongDTO> AddAsync(SongDTO entity)
        {
            try
            {
                return mapper.Map<SongDTO>(await repository.addItemAsync(mapper.Map<Song>(entity)));
            }
            catch (Exception err)
            {
                Console.WriteLine("Error adding item:");
                Console.WriteLine(err.Message);
                Console.WriteLine(err.StackTrace);
                throw;
            }
        }

        public async Task deleteAsync(long id)
        {
            await repository.deleteAsync(id);
        }

        public async Task<SongDTO> getAsync(long id)
        {
            return mapper.Map<SongDTO>(await repository.getAsync(id));
        }

        public async Task<List<SongDTO>> getAllAsync()
        {
            return mapper.Map<List<SongDTO>>(await repository.getAllAsync());
        }

        public async Task updateAsync(long id, SongDTO entity)
        {
            await repository.updateAsync(id, mapper.Map<Song>(entity));
        }
    }
}

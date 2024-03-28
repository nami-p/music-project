using AutoMapper;
using Common.Entity;
using Repository.Entity;
using Repository.Interface;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace Service.Services
{
    public class ReviewService:IService<ReviewDTO>
    {
        //המרה ממחלקה
        private readonly IMapper mapper;
        private readonly IRepository<Review> repository;
        public ReviewService(IRepository<Review> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<ReviewDTO> AddAsync(ReviewDTO entity)
        {
            return mapper.Map<ReviewDTO>(await repository.addItemAsync(mapper.Map<Review>(entity)));
        }

        public async Task deleteAsync(long id)
        {
            await repository.deleteAsync(id);
        }

        public async Task<ReviewDTO> getAsync(long id)
        {
            return mapper.Map<ReviewDTO>(await repository.getAsync(id));
        }

        public async Task<List<ReviewDTO>> getAllAsync()
        {
            return mapper.Map<List<ReviewDTO>>(await repository.getAllAsync());
        }

        public async Task updateAsync(long id, ReviewDTO entity)
        {
            await repository.updateAsync(id, mapper.Map<Review>(entity));
        }
    }
}

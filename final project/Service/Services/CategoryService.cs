using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Entity;
using System.Data;
using Entities.Entity;
using AutoMapper;
using Repository.Interface;

namespace Service.Services
{
    public class CategoryService:IService<CategoryDTO>
    {
        //המרה ממחלקה
        private readonly IMapper mapper;
        private readonly IRepository<Category> repository;
        public CategoryService(IRepository<Category> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<CategoryDTO> AddAsync(CategoryDTO entity)
        {
           return mapper.Map < CategoryDTO > (await repository.addItemAsync(mapper.Map<Category>(entity)));
        }

        public async Task deleteAsync(long id)
        {
            await repository.deleteAsync(id);
        }

        public async Task<CategoryDTO> getAsync(long id)
        {
            return mapper.Map<CategoryDTO>(await repository.getAsync(id));
        }

        public async Task<List<CategoryDTO>> getAllAsync()
        {
            return mapper.Map<List<CategoryDTO>>(await repository.getAllAsync());
        }

        public async Task updateAsync(long id, CategoryDTO entity)
        {
            await repository.updateAsync(id, mapper.Map<Category>(entity));
        }

        
    }
}

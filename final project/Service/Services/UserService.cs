using AutoMapper;
using Entities.Entity;
using Repository;
using Repository.Interface;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Entity;
using Microsoft.EntityFrameworkCore;

namespace Service.Services
{
    public class UserService:IServiceUserExtention<UserDTO>
    {
        //המרה ממחלקה
        private readonly IMapper mapper;
        private readonly IRepository<User> repository;
        public UserService(IRepository<User> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<UserDTO> AddAsync(UserDTO entity)
        {
           var user=await repository.addItemAsync(mapper.Map<User>(entity));
            user.Passward = "****";
            return mapper.Map<UserDTO>(user);
        }

        public async Task deleteAsync(long id)
        {
            await repository.deleteAsync(id);
        }

        public async Task<UserDTO> getAsync(long id)
        {
            return mapper.Map<UserDTO>(await repository.getAsync(id));
        }

        public async Task<List<UserDTO>> getAllAsync()
        {
            return mapper.Map<List<UserDTO>>(await repository.getAllAsync());
        }

        public async Task updateAsync(long id, UserDTO entity)
        {
            await repository.updateAsync(id, mapper.Map<User>(entity));
        }

        public async Task<UserDTO> GetByNameAndPassward(string password, string email)
        {

            var allUsers = await repository.getAllAsync();
            return mapper.Map<UserDTO>(allUsers.FirstOrDefault(x => BCrypt.Net.BCrypt.EnhancedVerify(password,x.Passward) && x.Email == email));
        }
    }
}

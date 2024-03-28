using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using Common.Entity;
using Entities.Entity;
using Repository.Entity;

namespace Service
{
    public class MapperProfile:Profile
    {
        public MapperProfile()
        {
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<SongDTO, Song>().ReverseMap();
            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<SongToUserDTO, SongToUser>().ReverseMap();
            CreateMap<ReviewDTO, Review>().ReverseMap();
        }
    }
}

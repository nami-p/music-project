using Common.Entity;
using Microsoft.Extensions.DependencyInjection;
using Repository;
using Repository.Entity;
using Service;
using Service.Interfaces;
using Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Service
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services) 
        {
            services.AddRepository();
            services.AddScoped<IServiceUserExtention<UserDTO>, UserService>();
            services.AddScoped<IServiceExetention<SongToUserDTO>, SongToUserService>();
            services.AddScoped<IService<SongDTO>, SongService>();
            services.AddScoped<IService<CategoryDTO>, CategoryService>();
            services.AddScoped<IService<ReviewDTO>, ReviewService>();
            services.AddAutoMapper(typeof(MapperProfile));
            return services;
        }
    }
}

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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;


namespace Service.Services
{
    public class ReviewService:IService<ReviewDTO>
    {
        //המרה ממחלקה
        private readonly IMapper mapper;
        private readonly IRepository<Review> repository;
        private readonly IRepository<SongToUser> playbackRepository;
        public ReviewService(IRepository<Review> repository,IRepository<SongToUser> playbackRepository, IMapper mapper)
        {
            this.repository = repository;
            this.playbackRepository = playbackRepository;
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

        public async Task<List<ReviewDTO>> JoinPlaybacksAndReviews(long songId)
        {
            var allReviews = await repository.getAllAsync();
           // var songReviews = allReviews?.Where(x => x.SongId == songId);

            var allPlaybacks = await playbackRepository.getAllAsync();
            // var songPlaybacks = allPlaybacks?.Where(x => x.SongId == songId);

            var newReviews = (from p in allPlaybacks
                              join r in allReviews
                              on new { p.UserId, p.SongId } equals new { r.UserId, r.SongId }
                              into joinedReviews
                              where p.SongId == songId
                              from rr in joinedReviews.DefaultIfEmpty()
                              select new ReviewDTO
                              {
                                  id = p.Id,
                                  ProfilImage = p?.Song.user.ProfilImage,
                                  Date = rr?.Date ?? DateTime.Now,
                                  Content = rr?.Content ?? "this user didnt react of this song",
                                  UserCount = p?.Count ?? 0,
                                  RatingStars = rr?.RatingStars ?? 0,
                                  UserLike = p.Love,
                                  UserAddedToCollection = p.AddToCollection,

                             }).ToList();
            //mapper.Map < List < ReviewDTO >> 
            return (mapper.Map<List<ReviewDTO>>(newReviews));
        }
    }
}

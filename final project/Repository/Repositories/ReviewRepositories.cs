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
    public class ReviewRepositories : IRepository<Review>
    {
        private readonly IContext _context;
        public ReviewRepositories(IContext context)
        {
            this._context = context;
        }
        public async Task<Review> addItemAsync(Review item)
        {
            Review review = item;
            try
            {
                await _context.reviews.AddAsync(item);
                await _context.save();
                return review;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task deleteAsync(long id)
        {
            _context.reviews.Remove(await getAsync(id));
            await _context.save();
        }

        public async Task<Review> getAsync(long id)
        {
            return await _context.reviews.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Review>> getAllAsync()
        {
            return await _context.reviews.ToListAsync();
        }

        public async Task updateAsync(long id, Review item)
        {

            //_context.reviews.Update(entity);
            var review = await this._context.reviews.FirstOrDefaultAsync(x => x.Id == id);
            review.Date = item.Date;
            review.Content = item.Content;
            review.RatingStars = item.RatingStars;
            review.song = item.song;
            review.user = item.user;
            await _context.save();
        }
    }
    //public void Add(Review item)
    //{
    //    this.context.reviews.Add(item);
    //    this.context.save();
    //}

    //public void Delete(Review item)
    //{
    //    this.context.reviews.Remove(item);
    //    this.context.save();

    //}

    //public List<Review> GetAll()
    //{

    //    return this.context.reviews.ToList();

    //}

    //public Review GetById(int id)
    //{
    //    return (Review)this.context.reviews.FirstOrDefault(x => x.Id == id);
    //}

    //public void Update(int id, Review item)
    //{
    //    var review = this.context.reviews.FirstOrDefault(x=> x.Id==id);
    //    review.Date = item.Date;
    //    review.Content=item.Content;    
    //    review.RatingStars=item.RatingStars;
    //    review.song=item.song;
    //    review.user=item.user;
    //    this.context.save();
    //}
}

using Entities.Entity;
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
    public class CategoryRepository : IRepository<Category>
    {
        private readonly IContext context;
        public CategoryRepository(IContext context) {
        this.context = context;
        }
        public async Task<Category> addItemAsync(Category item)
        {
            Category category = item;
            await context.categories.AddAsync(item);
            await this.context.save();
            return category;
        }

        public async Task deleteAsync(long id)
        {
            try
            {
                context.categories.Remove(await getAsync(id));
                await this.context.save();
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task<Category> getAsync(long id)
        {
            return await context.categories.Include(c => c.Songs).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Category>> getAllAsync()
        {
            return await context.categories.Include(c=>c.Songs).ToListAsync();
        }

        public async Task updateAsync(long id, Category item)
        {
            //context.categories.Update(entity);
            var category = await this.context.categories.FirstOrDefaultAsync(x => x.Id == id);
            category.Name = item.Name;
            category.Description = item.Description;
            category.Songs = item.Songs;
            category.Image = item.Image;
            await context.save();
        }
    }


    //    public List<Category> GetAll()
    //    {
    //       return this.context.categories.ToList();
    //    }

    //    public Category GetById(int id)
    //    {

    //        return this.context.categories.FirstOrDefault(x => x.Id == id);
    //    }

    //    public void Update(int id, Category item)
    //    {
    //       var category= this.context.categories.FirstOrDefault(x => x.Id == id);
    //        category.Name=item.Name;
    //        category.Description = item.Description;
    //        category.songs=item.songs;
    //        category.Image=item.Image;
    //        this.context.save();
    //    }
    //}
}

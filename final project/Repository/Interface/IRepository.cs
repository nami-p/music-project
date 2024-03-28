using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IRepository<T> where T : class
    {
        public Task<List<T>> getAllAsync();
        public Task<T> getAsync(long id);
        public Task deleteAsync(long id);
        public Task updateAsync(long id, T entity);
        public Task<T> addItemAsync(T item);

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    //bll
    public interface IService<T>
    {
        public Task<List<T>> getAllAsync();
        public Task<T> getAsync(long id);
        public Task updateAsync(long id,T entity);
        public Task deleteAsync(long id);
        public Task<T> AddAsync(T entity);
    }
}

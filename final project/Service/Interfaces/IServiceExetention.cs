using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;


namespace Service.Interfaces
{
    public interface IServiceExetention<T>:IService<T>
    {
        public Task<List<T>> GetAllPlayingsOfUser(long id);
        //public Task<List<T>> GetByUserAndCategory(long userId,long categoryId);
        public Task<T> GetByUserAndSong(long userId,long categoryId);
    }
}

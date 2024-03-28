using Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IServiceUserExtention<T>:IService<T>
    {
        public Task<UserDTO> GetByNameAndPassward(string passward, string email);
    }
}

using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
    public class UserDTO
    {
        public long? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Passward { get; set; }
        public string? Email { get; set; }
        public int? PhoneNumber { get; set; }
        public int? Age { get; set; }
        public string? ProfilImage { get ; set; }
        public string? Description { get ; set; }
        public IFormFile? FileImage { get; set; }
        public string? Code { get; set; }


    }
}

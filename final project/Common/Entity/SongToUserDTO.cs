using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
    public class SongToUserDTO
    {
        public int? Id { get; set; }
        public long? UserId { get; set; }
        public long? SongId { get; set; }
        public int Count { get; set ; }
        public bool? Love { get; set; }  
        public bool? AddToCollection { get; set; }   
        public string? UpdateNeeded { get; set; }  
        public SongDTO? Song { get; set; }
    }
}

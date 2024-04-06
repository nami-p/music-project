using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
    public class ReviewDTO
    {
        public long ? id { get; set; }
        public long SongId { get; set; }    
        public long UserId { get; set; }    
        public int RatingStars { get; set; }
        public string Content { get; set; }
        public DateTime? Date { get; set; }
        public UserDTO ?User { get; set; }

        //this variables are useful just for review extention

        public int ? UserCount { get; set; }    
        public bool ? UserLike { get; set; }    
        public bool ? UserAddedToCollection { get; set; }    
        public string ? ProfilImage { get; set; }    

    }
}

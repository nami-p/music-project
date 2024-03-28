using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
    public class ReviewDTO
    {
        public long SongId { get; set; }    
        public long UserId { get; set; }    
        public int RatingStars { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
    }
}

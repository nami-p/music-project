using Entities.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Review
    {
        private long id;
        //private long userId;
        private int ratingStars;
        private string content;
        private DateTime date;
        private long userId;
        private long songId;

        //public Review(long id, int ratingStars, string content, DateTime date)
        //{
        //    this.Id = id;
        //    this.RatingStars = ratingStars;
        //    this.Content = content;
        //    this.Date = date;
        //}
       

        public long Id { get => id; set => id = value; }
        public int RatingStars { get => ratingStars; set => ratingStars = value; }
        public string Content { get => content; set => content = value; }
        public DateTime Date { get => date; set => date = value; }
        public long UserId { get => userId; set => userId = value; }
        [ForeignKey("UserId")]
        public virtual User user { get; set; }
        public long SongId { get => songId; set => songId = value; }
        [ForeignKey("SongId")]
        public virtual Song song { get; set; }
    }
}

using Entities.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class SongToUser
    {
        private long id;
        private long userId;
        private long songId;
        private int count;
        private bool love;

        //public SongToUser()
        //{
        //}

        //public SongToUser(long id, long userId, long songId, int count)
        //{
        //    this.Id = id;
        //    this.UserId = userId;
        //    this.SongId = songId;
        //    this.Count = count;
        //}

        public long Id { get => id; set => id = value; }
        public long UserId { get => userId; set => userId = value; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public long SongId { get => songId; set => songId = value; }
        [ForeignKey("SongId")]
        public virtual Song Song { get; set; }
        public int Count { get => count; set => count = value; }
        public bool Love { get => love; set => love = value; }
        public bool AddToCollection { get; set; }   
    }
}

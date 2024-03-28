using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;
using Microsoft.AspNetCore.Http;

namespace Common.Entity
{
    public class SongDTO
    {
        public long? Id {  get; set; }
        public double? Fear     { get ; set ; }
        public double? Surprise { get; set ; }
        public double? Disgust  { get ; set; }
        public double? Happy    { get ; set; }
        public double? Sad      { get; set; }
        public double? Neutral { get ; set ; }
        public double? Angry { get ; set; }
        public string? Name { get ; set ; }
        public string? Description { get ; set; }
        //public long ArtistId { get => artistId; set => artistId = value; }
        public double? Length { get; set ; }
        public IFormFile? FileImage { get; set; }
        public string? Image { get; set; }
        public int ?RatingStars { get; set ; }
        public int ?NumOfPlays { get; set  ; }
        public int ? NumOfDownloads { get; set  ; }
        public int? NumOfListeners { get; set; }
        public int? NumOfLikes { get; set; }
        public int? NumOfAddedToCollections { get; set; }
        public  DateTime? UploadDate { get; set; }
        //public long CategoryId { get => categoryId; set => categoryId = value; }
        //public double[] Emotions { get; set; }
        public int? NumOfRaters { get; set ; }
        public string? Song1 { get; set ; }
        public string? SongName { get; set ; }  
        public IFormFile? FileSong { get; set; }
        public long UserId { get; set; }
        public long CategoryId { get; set ; }
        public UserDTO? User { get; set; }  
    }
}

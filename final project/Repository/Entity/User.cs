using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entity
{
    public class User
    {
        private long id;
        private string email;   
        private string password;    
        private string firstName;   
        private string lastName;
        private int age;    
        private int phoneNumber;
        private bool status;
        private string profilImage;
        public User()
        {
        }
   

        public long Id { get; set; }    
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Passward { get; set; }   
        public string  Email { get; set; }    
        public int PhoneNumber { get; set; }  
        public int Age { get; set; }
        public bool Status { get; set; }
        public string Description { get; set; }
        public string ProfilImage { get => profilImage; set => profilImage = value; }
        public virtual ICollection<Song> songs { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<SongToUser> playbacks { get; set; }

        //public User(long id, string email, string password, string firstName, string lastName, int age, int phoneNumber, bool status)
        //{
        //    this.id = id;
        //    this.email = email;
        //    this.password = password;
        //    this.firstName = firstName;
        //    this.lastName = lastName;
        //    this.age = age;
        //    this.phoneNumber = phoneNumber;
        //    this.status = status;

        //}
        //אופציונלי -
        //שירים למשתמש: לכל משתמש רשימת שירים (מערך מונים/טבלת גיבוב)מסווגת לפי מספר צפיות עדיף ממויינת מהגבוה לנמוך
        //קשרי גומלין :
        //קישור לטבלת שירים 
        //קישור לטבלת תגובות /דרוג 


    }
}

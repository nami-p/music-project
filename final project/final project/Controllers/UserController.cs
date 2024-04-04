using Microsoft.AspNetCore.Mvc;
using Repository.Entity;
using Service.Interfaces;
using Common.Entity;
using System.ComponentModel.DataAnnotations;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Entities.Entity;
using Org.BouncyCastle.Crypto.Generators;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace final_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IServiceUserExtention<UserDTO> service;

        public UserController(IServiceUserExtention<UserDTO> service)
        {
            this.service = service;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<List<UserDTO>> Get()
        {
            var allUsers = await service.getAllAsync();
            foreach (var user in allUsers)
            {
                user.ProfilImage=GetImage(user.ProfilImage);
            }
            return allUsers;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<UserDTO> Get(int id)
        {
            return await service.getAsync(id);
        }

        [HttpGet("{passward}/{email}")]
        public async Task<UserDTO> Get([Required] string passward, [Required] string email)
        {
            return await service.GetByNameAndPassward(passward, email);
        }

        // POST api/<UserController>
        //[HttpPost]
        //public async Task Post([FromBody] UserDTO User)
        //{
        //    await service.AddAsync(User);
        //}

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromForm] UserDTO r)
        {
            if (r.FileImage != null)
            {
                var myPath = Path.Combine(Environment.CurrentDirectory + "/images/" + r.FileImage.FileName);
                using (FileStream fs = new FileStream(myPath, FileMode.Create))
                {
                    r.FileImage.CopyTo(fs);
                    fs.Close();
                }

                r.ProfilImage = r.FileImage.FileName;
            }
            await service.updateAsync(id, r);
        
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.deleteAsync(id);
        }

        [HttpGet("getImage/{ImageUrl}")]
        public string GetImage(string ImageUrl)
        {
            var path = Path.Combine(Environment.CurrentDirectory, "images/", ImageUrl);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string imageBase64 = Convert.ToBase64String(bytes);
            string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
            return image;
        }
        // POST api/<CategoriessController>
        [HttpPost("signUp")]
        public async Task<ActionResult> Post([FromForm] UserDTO userDTO)
        {

            var myPath = Path.Combine(Environment.CurrentDirectory + "/images/" + userDTO.FileImage.FileName);
            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                userDTO.FileImage.CopyTo(fs);
                fs.Close();
            }

            userDTO.ProfilImage = userDTO.FileImage.FileName;
            string password = userDTO.Passward;
            string passwordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
            userDTO.Passward = passwordHash;
            return Ok( await service.AddAsync(userDTO));
        }


        private const int VerificationCodeLength = 4; // Length of the verification code
        private const int VerificationCodeValidityMinutes = 5; // Time in minutes for the verification code to remain valid
        private static string sentCode = "1234";
        private static UserDTO user = new UserDTO();

        private readonly Random _random = new Random();

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] UserDTO model)
        {
            // Validate email (you can add your validation logic here)
            var allUsers = await Get();
             user=allUsers.FirstOrDefault(x=> x.Email==model.Email);
            if (user == null)
            {
                return BadRequest(new { message = "you dont have account in tune wave you have to sign up !" });
            }
            // Generate random verification code
            string verificationCode = GenerateRandomVerificationCode(VerificationCodeLength);
            sentCode = verificationCode;
            // Send verification code via email
             string response = await SendEmail(model.Email, verificationCode);

            // Return some response indicating that the email has been sent
            return Ok(new { message = response });
        }

        [HttpPost("verify")]
        public  IActionResult VerifyCode([FromForm] UserDTO model)
        {
            // Compare the received code with the code sent to the user
            if (model.Code==sentCode)
            {
                Console.WriteLine("bla bla ");
                // Verification successful
                return Ok(user);
            }
            else
            {
                // Verification failed
                return BadRequest(new { message = "Invalid verification code" });
            }
        }
        //send email with the password 
        private async Task<string> SendEmail (string email,string code)
        {
            try
            {
                using(var client = new SmtpClient())
                {
                    await client.ConnectAsync("Smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync("tunewaveapplication@gmail.com", "zdmg aikr srlq vpkq");

                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress("tune wave", "tunewaveapplication@gmail.com"));
                    message.To.Add(MailboxAddress.Parse(email));
                    message.Subject = "email verification for tune wave";
                    message.Body = new TextPart("plain ")
                    {
                        Text = $"enter this 4 digits on the site for verification: {code}"
                    };
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }
                return("Email sent succesfully");
            }
            catch(Exception ex)
            {
                return $"Failed to send email to{ex.Message}";
            }
        }
        private string GenerateRandomVerificationCode(int length)
        {
            // Generate a random verification code of the specified length
            const string chars = "0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[_random.Next(s.Length)]).ToArray());
        }
    }
}

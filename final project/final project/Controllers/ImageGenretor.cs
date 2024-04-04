using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace final_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ImageGenretor : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ImageGenretor(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
            _httpClient.BaseAddress = new System.Uri("https://api.openai.com/v1/");
            _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer  key");
        }

        [HttpPost("generate-image")]
        public async Task<IActionResult> GenerateImage([FromBody] object requestData)
        {
            try
            {
                var response = await _httpClient.PostAsJsonAsync("images/generations", requestData);

                response.EnsureSuccessStatusCode();

                var responseData = await response.Content.ReadAsStringAsync();

                return Ok(responseData);
            }
            catch (HttpRequestException ex)
            {
                // Log the error
                return StatusCode(500, "Error generating image");
            }
        }
    }
}
    

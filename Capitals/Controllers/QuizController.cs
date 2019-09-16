using Capitals.Services;
using Microsoft.AspNetCore.Mvc;

namespace Capitals.Controllers
{
    [Route("api/[controller]")]
    public class QuizController : Controller
    {
        private readonly QuizService _service;
        public QuizController(QuizService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("GetQuestions/{difficulty}")]
        public IActionResult GetQuestions(int difficulty)
        {
            if(difficulty != 1 && difficulty != 2 && difficulty != 3) {
                return NotFound("Difficulty not found");
            }

            var result = _service.GetQuestions(difficulty);
            return Ok(result);
        }
    }
}
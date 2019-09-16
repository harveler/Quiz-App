using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Capitals.Models;
using Capitals.Models.ViewModels;
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
            var result = _service.GetQuestions(difficulty);
            return Ok(result);
        }
    }
}
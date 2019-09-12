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
        [Route("GetEasyQuestions")]
        public IActionResult GetEasyQuestions()
        {
            var result = _service.GetEasyQuestions();
            return Ok(result);
        }

        [HttpGet]
        [Route("GetMediumQuestions")]
        public IActionResult GetMediumQuestions()
        {
            var result = _service.GetMediumQuestions();
            return Ok(result);
        }

        [HttpGet]
        [Route("GetHardQuestions")]
        public IActionResult GetHardQuestions()
        {
            var result = _service.GetHardQuestions();
            return Ok(result);
        }
    }
}
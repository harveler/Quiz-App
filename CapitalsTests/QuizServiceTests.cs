using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using Capitals;
using Capitals.Controllers;
using Capitals.Models.ViewModels;
using Capitals.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using Capitals.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CapitalsTests
{
    public class QuizServiceTests
    {
        private QuizContext _context;
        public QuizServiceTests()
        {
            _context = new QuizContext();
            _context.Database.EnsureCreated();
        }

        [Fact]
        public void GetQuestions_ValidDifficulty_ReturnsList()
        {
            // I need to test that if I give this method a valid difficulty, it will return a list of questions
            var service = new QuizService(_context);

            var result = service.GetQuestions(1);

            Assert.True(result.Count() == 12);
        }

        [Fact]
        public void GetQuestions_InvalidDifficulty_ReturnsEmptyList()
        {
            var service = new QuizService(_context);

            var result = service.GetQuestions(4);

            Assert.Empty(result);
        }
    }
}
using Capitals;
using Capitals.Controllers;
using Capitals.Models.ViewModels;
using Capitals.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections;
using System.Collections.Generic;
using Xunit;

namespace CapitalsTests
{
    public class QuizControllerTests
    {
        [Fact]
        public void GetQuestions_ValidDifficulty_ReturnOk()
        {
            // arrange
            List<QuestionViewModel> list = new List<QuestionViewModel>
            {
                new QuestionViewModel
                {
                CountryName = "United Kingdom",
                Options = new Options {
                CapitalName = "London",
                FirstOption = "Paris",
                SecondOption = "Berlin",
                ThirdOption = "Madrid",
                }
                },
                new QuestionViewModel
                {
                CountryName = "United Kingdom",
                Options = new Options {
                CapitalName = "London",
                FirstOption = "Paris",
                SecondOption = "Berlin",
                ThirdOption = "Madrid",
                }
                },
            };
            var mockService = new Mock<QuizService>(null);
            mockService.Setup(u => u.GetQuestions(1)).Returns(list);
            var controller = new QuizController(mockService.Object);
            // act
            var result = controller.GetQuestions(1);
            var okResult = result as OkObjectResult;

            // assert
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public void GetQuestions_DifficultyOutofBounds_ReturnNotFound()
        {
            // arrange
            List<QuestionViewModel> list = new List<QuestionViewModel>
            {
                new QuestionViewModel
                {
                CountryName = "United Kingdom",
                Options = new Options {
                CapitalName = "London",
                FirstOption = "Paris",
                SecondOption = "Berlin",
                ThirdOption = "Madrid",
                }
                },
                new QuestionViewModel
                {
                CountryName = "United Kingdom",
                Options = new Options {
                CapitalName = "London",
                FirstOption = "Paris",
                SecondOption = "Berlin",
                ThirdOption = "Madrid",
                }
                },
            };
            var mockService = new Mock<QuizService>(null);
            mockService.Setup(u => u.GetQuestions(4)).Returns(list);
            var controller = new QuizController(mockService.Object);
            // act
            var result = controller.GetQuestions(4);
            var okResult = result as OkObjectResult;

            // assert
            Assert.Null(okResult);
            Assert.IsType<NotFoundObjectResult>(result);
        }
    }
}
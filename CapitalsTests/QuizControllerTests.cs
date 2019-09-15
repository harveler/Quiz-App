using System;
using System.Collections;
using System.Collections.Generic;
using Capitals;
using Capitals.Controllers;
using Capitals.Models.ViewModels;
using Capitals.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace CapitalsTests
{
    public class QuizControllerTests
    {
        [Fact]
        public void GetEasyQuestions_ResultNotNull_ReturnOk()
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
            mockService.Setup(u => u.GetEasyQuestions()).Returns(list);
            var controller = new QuizController(mockService.Object);
            // act
            var result = controller.GetEasyQuestions();
            var okResult = result as OkObjectResult;

            // assert
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);
        }
    }
}
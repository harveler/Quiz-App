using Capitals.Data;
using Capitals.Services;
using System.Linq;
using Xunit;

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
            // arrange
            var service = new QuizService(_context);
            int difficulty = 1;

            // act
            var result = service.GetQuestions(difficulty);

            // assert
            Assert.True(result.Count() == 12);
        }

        [Fact]
        public void GetQuestions_InvalidDifficulty_ReturnsEmptyList()
        {
            // arrange
            var service = new QuizService(_context);
            int difficulty = 4;

            // act
            var result = service.GetQuestions(difficulty);

            // assert
            Assert.Empty(result);
        }
    }
}
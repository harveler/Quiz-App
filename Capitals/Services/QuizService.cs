using Capitals.Data;
using Capitals.Models;
using Capitals.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Capitals.Services
{
    public class QuizService
    {
        private readonly QuizContext _context;

        public QuizService(QuizContext context)
        {
            _context = context;
        }
        public virtual List<QuestionViewModel> GetQuestions(int difficulty)
        {
            if (difficulty != 1 && difficulty != 2 && difficulty != 3)
            {
                return new List<QuestionViewModel>();
            }

            var allCapitalsOfSameDifficulty = _context.WorldCapitals.Where(c => c.Difficulty == difficulty);
            WorldCapital[] quizQuestions = new WorldCapital[12];
            for (var i = 0; i < 12; i++)
            {
                var randomQuestion = GetRandomQuestion(allCapitalsOfSameDifficulty, quizQuestions);
                quizQuestions[i] = randomQuestion;
            }

            List<QuestionViewModel> quizQuestionsAsViewModel = CreateQuestionViewModel(quizQuestions);

            return quizQuestionsAsViewModel;
        }

        private WorldCapital GetRandomQuestion(IQueryable<WorldCapital> collectionOfAllQuestions, WorldCapital[] quizQuestions)
        {
            var rnd = new Random();
            var result = collectionOfAllQuestions.Skip(rnd.Next(0, collectionOfAllQuestions.Count())).Take(1).FirstOrDefault();
            var check = quizQuestions.Contains(result) ? 1 : 0;
            if (check == 1)
            {
                return GetRandomQuestion(collectionOfAllQuestions, quizQuestions);
            }
            else
            {
                return result;
            }
        }

        private List<QuestionViewModel> CreateQuestionViewModel(WorldCapital[] quizQuestions)
        {
            List<QuestionViewModel> questionsWithOptions = new List<QuestionViewModel>();
            foreach (var question in quizQuestions)
            {
                var questionOptions = GetRandomOtherOptions(question);
                var result = new QuestionViewModel
                {
                    CountryName = question.CountryName,
                    Options = new Options
                    {
                    CapitalName = question.CapitalName,
                    FirstOption = questionOptions[0],
                    SecondOption = questionOptions[1],
                    ThirdOption = questionOptions[2]
                    }
                };
                questionsWithOptions.Add(result);
            }
            return questionsWithOptions;
        }

        private List<string> GetRandomOtherOptions(WorldCapital worldCapital)
        {
            var allCapitalNames = _context.WorldCapitals.Select(c => c.CapitalName).ToList();
            List<string> questionOptions = new List<string>();
            for (var i = 0; i < 3; i++)
            {
                var rnd = new Random();
                var option = allCapitalNames.Skip(rnd.Next(0, allCapitalNames.Count())).Take(1).FirstOrDefault();
                questionOptions.Add(option);
            }
            questionOptions.Add(worldCapital.CapitalName);
            var result = questionOptions.Distinct().Count() == questionOptions.Count();
            if (result)
            {
                questionOptions.Remove(worldCapital.CapitalName);
                return questionOptions;
            }
            return GetRandomOtherOptions(worldCapital);
        }
    }
}
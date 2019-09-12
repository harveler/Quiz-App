using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Capitals.Data;
using Capitals.Models;
using Capitals.Models.ViewModels;

namespace Capitals.Services
{
    public class QuizService
    {
        private readonly QuizContext _context;

        public QuizService(QuizContext context)
        {
            _context = context;
        }
        public QuestionViewModel[] GetEasyQuestions()
        {
            var data = _context.WorldCapitals.Where(c => c.Difficulty == 1);
            WorldCapital[] questions = new WorldCapital[12];
            for (var i = 0; i <= 12; i++)
            {
                var data1 = GetRandomQuestion(data, questions);
                questions[i] = data1;
            }

            QuestionViewModel[] listOfQuestions = CreateQuestionViewModel(questions);

            return listOfQuestions;
        }

        private WorldCapital GetRandomQuestion(IQueryable<WorldCapital> question, WorldCapital[] questions)
        {
            var result = question.ElementAtOrDefault(new System.Random().Next() % question.Count());
            var check = questions.Contains(result) ? 1 : 0;
            if (check == 1)
            {
                GetRandomQuestion(question, questions);
            };
            return result;
        }

        private List<string> GetRandomOtherOptions(WorldCapital worldCapital)
        {
            var data = _context.WorldCapitals.Select(c => c.CapitalName).ToList();
            List<string> list = new List<string>();
            for (var i = 0; i < 3; i++)
            {
                var option = data.ElementAtOrDefault(new System.Random().Next() % data.Count());
                list.Add(option);
            }
            list.Add(worldCapital.CapitalName);
            var result = list.Distinct().Count() == list.Count();
            if (result)
            {
                list.Remove(worldCapital.CapitalName);
                return list;
            }
            return GetRandomOtherOptions(worldCapital);
        }

        private QuestionViewModel[] CreateQuestionViewModel(WorldCapital[] questions)
        {
            QuestionViewModel[] list = new QuestionViewModel[12];
            foreach (var question in questions)
            {
                var options = GetRandomOtherOptions(question);
                var result = new QuestionViewModel
                {
                    CountryName = question.CountryName,
                    CapitalName = question.CapitalName,
                    FirstOption = options[0],
                    SecondOption = options[1],
                    ThirdOption = options[2]
                };
                list.Append(result);
            }
            return list;
        }

        public QuestionViewModel[] GetMediumQuestions()
        {
            var data = _context.WorldCapitals.Where(c => c.Difficulty == 2);
            WorldCapital[] questions = new WorldCapital[12];
            for (var i = 0; i <= 12; i++)
            {
                var data1 = GetRandomQuestion(data, questions);
                questions[i] = data1;
            }

            QuestionViewModel[] listOfQuestions = CreateQuestionViewModel(questions);

            return listOfQuestions;
        }

        public QuestionViewModel[] GetHardQuestions()
        {
            var data = _context.WorldCapitals.Where(c => c.Difficulty == 2);
            WorldCapital[] questions = new WorldCapital[12];
            for (var i = 0; i <= 12; i++)
            {
                var data1 = GetRandomQuestion(data, questions);
                questions[i] = data1;
            }

            QuestionViewModel[] listOfQuestions = CreateQuestionViewModel(questions);

            return listOfQuestions;
        }
    }
}
using Capitals.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Capitals.Data
{
    public class QuizContext : DbContext
    {

        public DbSet<WorldCapital> WorldCapitals { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Database=quizapp;Username=postgres;Password=password");
    }
}

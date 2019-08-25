using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Capitals.Models
{
    public class WordlCapital
    {
        [Key]
        public int Id { get; set; }
        public List<Country> Countries { get; set; }
        public List<Capital> Capitals { get; set; }
        public int Difficulty { get; set; }
    }
}
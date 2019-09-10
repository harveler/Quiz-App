using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Capitals.Models
{
    public class WorldCapital
    {
        [Key]
        public int Id { get; set; }
        public string CountryName { get; set; }
        public string CapitalName { get; set; }
        public int Difficulty { get; set; }
    }
}
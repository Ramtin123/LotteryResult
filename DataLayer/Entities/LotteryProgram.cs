using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LotteryResultViewer.DataLayer.Entities
{
    public class LotteryProgram
    {
        [Key]
        public int Id { set; get; }
        public string ProgramName { set; get; }
    }
}

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LotteryResultViewer.DataLayer.Entities
{
    public class LotteryProgram
    {
        public LotteryProgram()
        {
            LotteryWinners = new List<LotteryWinner>();
        }
        [Key]
        public int Id { set; get; }
        public string ProgramName { set; get; }
        public virtual ICollection<LotteryWinner> LotteryWinners { set; get; }
    }
}

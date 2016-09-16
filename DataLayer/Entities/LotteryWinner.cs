using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LotteryResultViewer.DataLayer.Entities
{
    public class LotteryWinner
    {
        [Key]
        public int Id { set; get; }
        public string Name { set; get; }
        
        public LotteryProgram LotteryProgram { set; get; }
       

    }
}

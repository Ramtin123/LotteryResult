using System.Data.Entity;
using LotteryResultViewer.DataLayer.Entities;
using LotteryResultViewer.DataLayer.Base;

namespace LotteryResultViewer.DataLayer.Context
{

    public interface ILotteryResultContext : IContext
    {
        IDbSet<LotteryProgram> LotteryPrograms { get; set; }
        IDbSet<LotteryWinner> LotteryWinners { get; set; }
    }
    public class LotteryResultContext : DbContext, ILotteryResultContext
    {
        public IDbSet<LotteryProgram> LotteryPrograms { get; set; }
        public IDbSet<LotteryWinner> LotteryWinners { get; set; }

        public void SetModified(object entity)
        {
            Entry(entity).State = EntityState.Modified;
        }

        public void SetAdd(object entity)
        {
            Entry(entity).State = EntityState.Added;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Configuration.LazyLoadingEnabled = false;
            
        }
        
    }
}
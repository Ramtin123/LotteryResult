using LotteryResultViewer.DataLayer.Context;
using LotteryResultViewer.DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace LotteryResultViewer.DataLayer.Repositories
{
    public interface ILotterWinnersRepository : IRepository<LotteryWinner>, IDisposable
    {
        Task<IList<LotteryWinner>> FindByProgramId(int ProgramId);
    }
    public class LotterWinnersRepository : ILotterWinnersRepository
    {
        public LotterWinnersRepository(ILotteryResultContext context)
        {
            _context = context;
        }
        private readonly ILotteryResultContext _context;
        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<IList<LotteryWinner>> FindByProgramId(int ProgramId)
        {
            return await Task.FromResult(_context.LotteryWinners.Where(w=>w.LotteryProgram.Id.Equals(ProgramId)).ToList());
        }

        public async Task AddOrUpdate(LotteryWinner entity)
        {
            await Task.Run(() => {
                if (entity.Id == default(int)) // New entity
                {
                    _context.SetAdd(entity);
                }
                else        // Existing entity
                {
                    _context.SetModified(entity);
                };
                
                _context.SaveChanges();
            });
        }
    }
}

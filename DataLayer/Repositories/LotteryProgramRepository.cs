using LotteryResultViewer.DataLayer.Base;
using LotteryResultViewer.DataLayer.Context;
using LotteryResultViewer.DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace LotteryResultViewer.DataLayer.Repositories
{
    public interface ILotteryProgramRepository: IRepository<LotteryProgram>,IDisposable
    {
        Task<IList<LotteryProgram>> GetAll();

    }
    public class LotteryProgramRepository: ILotteryProgramRepository
    {
        public LotteryProgramRepository(ILotteryResultContext context)
        {
            _context = context;
        }
        private readonly ILotteryResultContext _context;
        
        public async Task<IList<LotteryProgram>> GetAll()
        {
            return await Task.FromResult(_context.LotteryPrograms.ToList());
        }


        public async Task AddOrUpdate(LotteryProgram entity)
        {
            await Task.Run(()=> {
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
        
        public void Dispose()
        {
            _context.Dispose();
        }

        
    }
}

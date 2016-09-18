using LotteryResultViewer.DataLayer.Context;
using LotteryResultViewer.DataLayer.Entities;
using LotteryResultViewer.DataLayer.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;

namespace LotteryResultViewer.Tests.Repositories
{
    [TestClass]
    public class LotterWinnersRepositoryTests
    {
        private ILotteryResultContext _lotteryResultContext;
        private LotterWinnersRepository _lotterWinnersRepository;
        private List<LotteryProgram> _programs;
        [TestInitialize()]
        public void TestInitialize()
        {
            _lotteryResultContext = Substitute.For<ILotteryResultContext>();
            _lotterWinnersRepository = new LotterWinnersRepository(_lotteryResultContext);
            _programs = new List<LotteryProgram>() { new LotteryProgram() { Id = 1, ProgramName = "program1" }, new LotteryProgram() { Id = 2, ProgramName = "program2" } };


            var _winners = new List<LotteryWinner>{
               new LotteryWinner() { Id = 1, Name = "John", LotteryProgram = _programs.First() }, new LotteryWinner() { Id = 2, Name = "Paul", LotteryProgram = _programs.First() }
            }.AsQueryable();
            var mockSet = Substitute.For<DbSet<LotteryWinner>, IQueryable<LotteryWinner>>();
            ((IQueryable<LotteryWinner>)mockSet).Provider.Returns(_winners.Provider);
            ((IQueryable<LotteryWinner>)mockSet).Expression.Returns(_winners.Expression);
            ((IQueryable<LotteryWinner>)mockSet).ElementType.Returns(_winners.ElementType);
            ((IQueryable<LotteryWinner>)mockSet).GetEnumerator().Returns(_winners.GetEnumerator());

            // do the wiring between DbContext and DbSet
            var mockContext = Substitute.For<ILotteryResultContext>();
            mockContext.LotteryWinners.Returns(mockSet);
            _lotterWinnersRepository = new LotterWinnersRepository(mockContext);

        }
        [TestMethod]
        public async Task GetAllWinners()
        {
            var result=await _lotterWinnersRepository.FindByProgramId(1);
            result.Count().Should().Be(2);
        }


    }
}

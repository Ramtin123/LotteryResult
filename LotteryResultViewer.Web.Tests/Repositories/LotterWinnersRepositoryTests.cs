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
        private ILotteryResultContext mockContext;
        private LotterWinnersRepository _lotterWinnersRepository;
        private List<LotteryProgram> _programs;
        private IQueryable<LotteryWinner> _winners;
        [TestInitialize()]
        public void TestInitialize()
        {
            _programs = new List<LotteryProgram>() { new LotteryProgram() { Id = 1, ProgramName = "program1" }, new LotteryProgram() { Id = 2, ProgramName = "program2" } };
            _winners = new List<LotteryWinner>{
               new LotteryWinner() { Id = 1, Name = "John", LotteryProgram = _programs.First() }, new LotteryWinner() { Id = 2, Name = "Paul", LotteryProgram = _programs.First() },new LotteryWinner() { Id = 3, Name = "Ramtin", LotteryProgram = _programs.Find(f=>f.Id.Equals(2)) }
            }.AsQueryable();
            var mockSet = Substitute.For<DbSet<LotteryWinner>, IQueryable<LotteryWinner>>();
            ((IQueryable<LotteryWinner>)mockSet).Provider.Returns(_winners.Provider);
            ((IQueryable<LotteryWinner>)mockSet).Expression.Returns(_winners.Expression);
            ((IQueryable<LotteryWinner>)mockSet).ElementType.Returns(_winners.ElementType);
            ((IQueryable<LotteryWinner>)mockSet).GetEnumerator().Returns(_winners.GetEnumerator());
            
            mockContext = Substitute.For<ILotteryResultContext>();
            mockContext.LotteryWinners.Returns(mockSet);
            _lotterWinnersRepository = new LotterWinnersRepository(mockContext);

        }
        [TestMethod]
        public async Task GetAllWinners()
        {
            var result=await _lotterWinnersRepository.FindByProgramId(1);
            result.Count().Should().Be(2);
        }
        [TestMethod]
        public async Task AddingAWinner()
        {
            var winner = new LotteryWinner(){Name="Ramtin",LotteryProgram=_programs.First() };
            await _lotterWinnersRepository.AddOrUpdate(winner);
            mockContext.Received().SetAdd(Arg.Is(winner));
            mockContext.Received().SaveChanges();
        }
        [TestMethod]
        public async Task UpdatingAWinner()
        {
            var winner = new LotteryWinner() {Id=1, Name = "Ramtin", LotteryProgram = _programs.First() };
            await _lotterWinnersRepository.AddOrUpdate(winner);
            mockContext.Received().SetModified(Arg.Is(winner));
            mockContext.Received().SaveChanges();
        }


    }
}

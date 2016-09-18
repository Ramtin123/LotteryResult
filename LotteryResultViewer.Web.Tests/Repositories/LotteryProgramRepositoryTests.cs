using FluentAssertions;
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

namespace LotteryResultViewer.Tests.Repositories
{
    public class LotteryProgramRepositoryTests
    {
        [TestClass]
        public class LotteryProgramRepositoryTest
        {
            private ILotteryResultContext mockContext;
            private LotteryProgramRepository _lotteryProgramRepository;
            private IQueryable<LotteryProgram> _programs;
            [TestInitialize()]
            public void TestInitialize()
            {
                _programs = new List<LotteryProgram>{
                         new LotteryProgram() { Id = 1, ProgramName = "program1" }, new LotteryProgram() { Id = 2, ProgramName = "program2" } 
                }.AsQueryable();
                var mockSet = Substitute.For<DbSet<LotteryProgram>, IQueryable<LotteryProgram>>();
                ((IQueryable<LotteryProgram>)mockSet).Provider.Returns(_programs.Provider);
                ((IQueryable<LotteryProgram>)mockSet).Expression.Returns(_programs.Expression);
                ((IQueryable<LotteryProgram>)mockSet).ElementType.Returns(_programs.ElementType);
                ((IQueryable<LotteryProgram>)mockSet).GetEnumerator().Returns(_programs.GetEnumerator());

                mockContext = Substitute.For<ILotteryResultContext>();
                mockContext.LotteryPrograms.Returns(mockSet);
                _lotteryProgramRepository = new LotteryProgramRepository(mockContext);

            }
            [TestMethod]
            public async Task GetLotteryPrograms()
            {
                var result = await _lotteryProgramRepository.GetAll();
                result.Count().Should().Be(2);
            }
            [TestMethod]
            public async Task AddingAWinner()
            {
                var program = new LotteryProgram() { ProgramName="Program3" };
                await _lotteryProgramRepository.AddOrUpdate(program);
                mockContext.Received().SetAdd(Arg.Is(program));
                mockContext.Received().SaveChanges();
            }
            [TestMethod]
            public async Task UpdatingAWinner()
            {
                var program = new LotteryProgram() { Id = 1, ProgramName="Lottery3"};
                await _lotteryProgramRepository.AddOrUpdate(program);
                mockContext.Received().SetModified(Arg.Is(program));
                mockContext.Received().SaveChanges();
            }
        }
    }
}

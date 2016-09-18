using LotteryResultViewer.DataLayer.Entities;
using LotteryResultViewer.DataLayer.Repositories;
using LotteryResultViewer.WebApi.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using System.Web.Http;
using System.Web.Http.Results;

namespace LotteryResultViewer.Tests.Controllers
{
    public class apiControllerTest
    {

        [TestClass]
        public class HomeControllerTest
        {
            private apiController _apiController;
            private ILotteryProgramRepository _lotteryProgramRepository;
            private ILotterWinnersRepository _lotterWinnersRepository;
            private List<LotteryProgram> _programs;
            private List<LotteryWinner> _winners;
            [TestInitialize()]
            public void TestInitialize()
            {
                _lotteryProgramRepository = Substitute.For<ILotteryProgramRepository>();
                _lotterWinnersRepository = Substitute.For<ILotterWinnersRepository>();
                _apiController = new apiController(_lotteryProgramRepository, _lotterWinnersRepository);
                _programs = new List<LotteryProgram>() { new LotteryProgram() { Id = 1, ProgramName = "program1" }, new LotteryProgram() { Id = 2, ProgramName = "program2" } };
                _winners = new List<LotteryWinner>() { new LotteryWinner() { Id = 1, Name = "John", LotteryProgram = _programs.First() }, new LotteryWinner() { Id = 2, Name = "Paul", LotteryProgram = _programs.First() } };

            }
            [TestMethod]
            public async Task LotteryWinnersTest()
            {
                _lotterWinnersRepository.FindByProgramId(Arg.Any<int>()).Returns(Task.FromResult<IList<LotteryWinner>>(_winners)) ;
                var result =await  _apiController.LotteryWinners(1) as OkNegotiatedContentResult<IList<LotteryWinner>>; 
                await _lotterWinnersRepository.Received().FindByProgramId(Arg.Is(1));
                result.Content.Count().Should().Be(_winners.Count());
            }
            [TestMethod]
            public async Task LotteryProgramsTest()
            {
                _lotteryProgramRepository.GetAll().Returns(_programs);
                var result = await _apiController.LotteryPrograms();
                await _lotteryProgramRepository.Received().GetAll();
            }

        }
    }
}

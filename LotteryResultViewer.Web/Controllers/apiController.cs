using LotteryResultViewer.DataLayer.Repositories;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace LotteryResultViewer.WebApi.Controllers
{
    [RoutePrefix("api")]
    public class apiController : ApiController
    {
        private readonly ILotteryProgramRepository _lotteryProgramRepository;
        private readonly ILotterWinnersRepository _lotterWinnersRepository;
        public apiController(ILotteryProgramRepository lotteryProgramRepository, ILotterWinnersRepository lotterWinnersRepository)
        {
            _lotteryProgramRepository = lotteryProgramRepository;
            _lotterWinnersRepository = lotterWinnersRepository;
        }
        [Route("LotteryWinners/{LotteryProgramId}")]
        [HttpGet]
        public async Task<IHttpActionResult> LotteryWinners(int LotteryProgramId)
        {
            try
            {
                return Ok(await _lotterWinnersRepository.FindByProgramId(LotteryProgramId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
        [Route("LotteryPrograms")]
        [HttpGet]
        public async Task<IHttpActionResult> LotteryPrograms()
        {
            try
            {
                return Ok(await _lotteryProgramRepository.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
    
}

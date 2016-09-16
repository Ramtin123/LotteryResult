using LotteryResultViewer.DataLayer.Repositories;
using LotteryResultViewer.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LotteryResultViewer.WebApi.Controllers
{
    public interface IApiController
    {
        Task<IHttpActionResult> LotteryWinners(int LotteryProgramId);
    }
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    [RoutePrefix("api")]
    public class apiController : ApiController, IApiController
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

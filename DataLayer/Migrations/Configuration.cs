
namespace LotteryResultViewer.DataLayer.Migrations
{
    using Context;
    using Entities;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public sealed class Configuration : DbMigrationsConfiguration<LotteryResultContext>
	{
		public Configuration()
		{
			AutomaticMigrationsEnabled = false;
		}

		protected override void Seed(LotteryResultContext context)
		{
            if (context.LotteryPrograms.Any()) return;
            var program1 = new LotteryProgram() {Id=1, ProgramName="Program1" };
            var program2 = new LotteryProgram() {Id=2, ProgramName = "Program2" };
            context.LotteryPrograms.AddOrUpdate(p => p.Id, program1);
            context.LotteryPrograms.AddOrUpdate(p => p.Id, program2);

            for (var i = 0; i < 20; i++)
			{
                var lotteryWinner = new LotteryWinner() { Id = i, Name = string.Format("Client{0}", i),LotteryProgram=program1 };
				context.LotteryWinners.AddOrUpdate(p => p.Id, lotteryWinner);
			}
            for (var i = 21; i < 35; i++)
            {
                var lotteryWinner = new LotteryWinner() { Id = i, Name = string.Format("Client{0}", i), LotteryProgram = program2 };
                context.LotteryWinners.AddOrUpdate(p => p.Id, lotteryWinner);
            }
            context.SaveChanges();
		}
	}
}

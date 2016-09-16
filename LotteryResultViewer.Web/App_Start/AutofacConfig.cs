using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using LotteryResultViewer.DataLayer.Context;
using LotteryResultViewer.DataLayer.Repositories;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;

namespace LotteryResultViewer.Web
{
    public static class AutofacConfig
    {
        public static IContainer Configure()
        {
           
            var builder = new ContainerBuilder();
            var config = GlobalConfiguration.Configuration;

           
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterWebApiFilterProvider(config);
            builder.RegisterType<LotteryProgramRepository>().As<ILotteryProgramRepository>();
            builder.RegisterType<LotteryResultContext>().As<ILotteryResultContext>();
            builder.RegisterType<LotterWinnersRepository>().As<ILotterWinnersRepository>();
             
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            return container;
            

        }
    }
}
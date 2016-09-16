using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LotteryResultViewer.Web.Startup))]
namespace LotteryResultViewer.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            
        }
    }
}

using System.Data.Entity;

namespace LotteryResultViewer.DataLayer.Base
{
  public class BaseContext<TContext> 
    : DbContext where TContext : DbContext
  {
    static BaseContext()
    {
      Database.SetInitializer<TContext>(null);
    }
    protected BaseContext()
        : base("name=LotteryResultContext")
    {}
  }
 }

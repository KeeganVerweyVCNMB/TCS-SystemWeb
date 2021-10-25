using DAL.Respositories;
using DAL.Respositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DAL
{
    public class Setup
    {
        public static void AddDIService(IServiceCollection services)
        {
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IComplaintsRepository, ComplaintsRepository>();
            services.AddDbContext<MainContext>(context => context.UseLazyLoadingProxies().UseSqlServer("Server=tcp:westwardhosqlserver.database.windows.net,1433;Initial Catalog=WestwardHoDB;Persist Security Info=False;User ID=WestwardAdmin;Password=Pasta@711;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;").EnableSensitiveDataLogging());
        }
    }
}

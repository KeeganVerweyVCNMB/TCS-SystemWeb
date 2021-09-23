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
            services.AddDbContext<MainContext>(context => context.UseLazyLoadingProxies().UseSqlServer("Server=tcp:complaintsserver.database.windows.net,1433;Initial Catalog=complaints;Persist Security Info=False;User ID=adminuser;Password=notComprsa123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;").EnableSensitiveDataLogging());
        }
    }
}

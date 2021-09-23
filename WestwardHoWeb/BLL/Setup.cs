using BLL.Interfaces;
using DAL.Respositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
    public class Setup
    {
        public static void AddDIService(IServiceCollection services)
        {
            services.AddTransient<IUser, User>();
            services.AddTransient<IComplaints, Complaints>();
            DAL.Setup.AddDIService(services);
        }
    }
}

using Common.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class MainContext : DbContext
    {
        private readonly DbContextOptions<MainContext> _config;
        public MainContext(DbContextOptions<MainContext> options) : base(options)
        {
            _config = options;
        }

        public MainContext() 
        {
            _config = new DbContextOptions<MainContext>();
            
        }

        public DbSet<UserModel> User { get; set; }
        public DbSet<ComplaintsModel> Complaint { get; set; }
        public DbSet<LogWaterModel> LogWater { get; set; }
        public DbSet<NotesModel> Note { get; set; }
        public DbSet<RulesModel> Rule { get; set; }
        public DbSet<MeetingsModel> Meeting { get; set; }
    }
}

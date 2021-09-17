using Common.Models;
using DAL.Respositories.Interfaces;
using System;
using System.Linq;

namespace DAL.Respositories
{
    public class UserRepository : BaseRepository<MainContext>, IUserRepository
    {
        public UserRepository(MainContext context) : base(context) { }

        public UserModel LoginUser(string emailAddress, string password)
        {
            try
            {
                return _DatabaseContext.User.Where(e => e.IsDeleted != true && e.EmailAddress == emailAddress && e.Password == password).FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool AddUpdateUserProfile(UserModel model)
        {
            try
            {
                if (model.UserID == new Guid())
                {
                    //Add
                    _DatabaseContext.User.Add(model);
                }
                else
                {
                    //Update
                    _DatabaseContext.User.Update(model);
                }
                return _DatabaseContext.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;
            }


            
        }


        public UserModel GetUserByID(Guid userID)
        {
            return _DatabaseContext.User.Where(e => e.UserID == userID).FirstOrDefault();
        }

    }
}

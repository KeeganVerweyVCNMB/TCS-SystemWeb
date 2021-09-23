using Common.Models;
using System;

namespace DAL.Respositories.Interfaces
{
    public interface IUserRepository
    {
        UserModel LoginUser(string emailAddress, string password);
        bool AddUpdateUserProfile(UserModel model);
        UserModel GetUserByID(Guid userID);
    }
}

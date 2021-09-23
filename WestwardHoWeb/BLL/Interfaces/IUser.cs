using Common.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface IUser
    {
        bool RegisterUser(UserDTO dto);
        UserDTO LoginUser(UserDTO dto);
        UserDTO UpdateUserProfile(UserDTO dto);
        UserDTO GetUserByID(Guid userID);
    }
}

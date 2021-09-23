using BLL.Interfaces;
using Common.DTO;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ComplaintSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserAuthController : ControllerBase
    {
        private IUser _user { get; set; }
        public UserAuthController(IUser user)
        {
            _user = user;
        }

        [HttpPost]
        [Route("RegisterUser")]
        public JsonResult RegisterUser([FromBody] UserDTO dto)
        {
            return new JsonResult(_user.RegisterUser(dto));
        }

        [HttpPost]
        [Route("UpdateUserProfile")]
        public JsonResult UpdateUserProfile([FromBody] UserDTO dto)
        {
            return new JsonResult(_user.UpdateUserProfile(dto));
        }

        [HttpPost]
        [Route("LoginUser")]
        public JsonResult LoginUser([FromBody] UserDTO dto)
        {
            return new JsonResult(_user.LoginUser(dto));
        }

        [HttpGet]
        [Route("GetUserByID")]
        public JsonResult GetUserByID(string userID)
        {
            Guid UserID = Guid.Parse(userID);
            return new JsonResult(_user.GetUserByID(UserID));
        }

    }
}

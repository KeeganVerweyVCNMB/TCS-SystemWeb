using BLL.Interfaces;
using Common.DTO;
using Common.Models;
using DAL.Respositories.Interfaces;
using System;
using System.Security.Cryptography;

namespace BLL
{
    public class User : IUser
    {
        IUserRepository _userRepository { get; set; }

        public User(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public bool RegisterUser(UserDTO dto)
        {
            dto.Password = GeneratePassword(dto.Password);
            return _userRepository.AddUpdateUserProfile(MapUserToModel(dto));
        }

        public UserDTO LoginUser(UserDTO dto)
        {
            dto.Password = GeneratePassword(dto.Password);
            UserModel user = _userRepository.LoginUser(dto.EmailAddress.ToLower(), dto.Password);
            if(user != null)
            {
                return MapUserToDTO(user);
            }
            else
            {
                return null;
            }
        }

        public UserDTO UpdateUserProfile(UserDTO dto)
        {
            UserModel user = _userRepository.GetUserByID(dto.UserID.Value);
            user.EmailAddress = dto.EmailAddress;
            user.Name = dto.Name;
            user.Surname = dto.Surname;
            user.UnitNumber = dto.UnitNumber;
            user.MoveInYear = dto.MoveInYear;
            user.PhoneNumber = dto.PhoneNumber;
            _userRepository.AddUpdateUserProfile(user);
            return MapUserToDTO(user);
        }

        public UserDTO GetUserByID(Guid userID)
        {
            return MapUserToDTO(_userRepository.GetUserByID(userID));
        }

        private UserModel MapUserToModel(UserDTO dto)
        {
            return new UserModel()
            {
                EmailAddress = dto.EmailAddress,
                Name = dto.Name,
                Surname = dto.Surname,
                UnitNumber = dto.UnitNumber,
                MoveInYear = dto.MoveInYear,
                Password = dto.Password,
                PhoneNumber = dto.PhoneNumber,
                UserID = dto.UserID != null ? dto.UserID.Value : new Guid()
            };
        }

        private UserDTO MapUserToDTO(UserModel model)
        {
            return new UserDTO()
            {
                EmailAddress = model.EmailAddress,
                Name = model.Name,
                Surname = model.Surname,
                UnitNumber = model.UnitNumber,
                MoveInYear = model.MoveInYear,
                PhoneNumber = model.PhoneNumber,
                UserID = model.UserID
            };
        }

        private string GeneratePassword(string password, string secret = "FlubberBubber")
        {
            var encoding = new System.Text.ASCIIEncoding();
            byte[] keyByte = encoding.GetBytes(secret);
            byte[] messageBytes = encoding.GetBytes(password);
            using (var hmacsha512 = new HMACSHA512(keyByte))
            {
                byte[] hashmessage = hmacsha512.ComputeHash(messageBytes);
                return Convert.ToBase64String(hashmessage);
            }
        }
    }
}

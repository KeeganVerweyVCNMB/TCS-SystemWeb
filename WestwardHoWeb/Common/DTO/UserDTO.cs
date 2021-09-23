using System;

namespace Common.DTO
{
    public class UserDTO
    {
        public Guid? UserID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string MoveInYear { get; set; }
        public string Password { get; set; }
    }
}

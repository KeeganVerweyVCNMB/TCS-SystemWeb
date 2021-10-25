using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class MeetingsDTO
    {
        public Guid? MeetingID { get; set; }
        public string Title { get; set; }
        public string Host { get; set; }
        public string Link { get; set; }
        public string DateCreated { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid UserID { get; set; }
        public string CreatedByName { get; set; }
    }
}

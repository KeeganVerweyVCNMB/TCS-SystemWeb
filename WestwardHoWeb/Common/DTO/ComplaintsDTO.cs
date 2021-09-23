using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class ComplaintsDTO
    {
        public Guid? ComplaintsID { get; set; }
        public string ComplaintTitle { get; set; }
        public string ComplaintDescription { get; set; }
        public string ComplaintStatus { get; set; } = "New";
        public string DateCreated { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid UserID { get; set; }
        public string CreatedByName { get; set; }
    }
}

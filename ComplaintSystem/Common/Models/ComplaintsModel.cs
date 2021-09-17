using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Models
{
    [Table("Complaint")]
    public class ComplaintsModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ComplaintsID { get; set; }
        public string ComplaintTitle { get; set; }
        public string ComplaintDescription { get; set; }
        public string ComplaintStatus { get; set; } = "New";
        public DateTime DateCreated { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual UserModel User { get; set; }

    }
}

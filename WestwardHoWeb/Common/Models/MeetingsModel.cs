using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Models
{
    [Table("Meetings")]
    public class MeetingsModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid MeetingID { get; set; }
        public string Title { get; set; }
        public string Host { get; set; }
        public string Link { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual UserModel User { get; set; }

    }
}

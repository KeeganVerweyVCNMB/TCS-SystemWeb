using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Models
{
    [Table("Notices")]
    public class NotesModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid NoteID { get; set; }
        public string Title { get; set; }
        public string Note { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual UserModel User { get; set; }

    }
}

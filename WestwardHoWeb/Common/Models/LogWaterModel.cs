using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Models
{
    [Table("WaterLog")]
    public class LogWaterModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid WaterLogID { get; set; }
        public string Unit { get; set; }
        public string Name { get; set; }
        public string Usage { get; set; }
        public string Billed { get; set; }
        public string DateStart { get; set; }
        public string DateEnd { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual UserModel User { get; set; }

    }
}

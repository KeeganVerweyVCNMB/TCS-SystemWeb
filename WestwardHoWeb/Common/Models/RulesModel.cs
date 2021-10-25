using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Models
{
    [Table("HousingRules")]
    public class RulesModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RuleID { get; set; }
        public string Title { get; set; }
        public string Rule { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual UserModel User { get; set; }

    }
}

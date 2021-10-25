using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class RulesDTO
    {
        public Guid? RuleID { get; set; }
        public string Title { get; set; }
        public string Rule { get; set; }
        public string DateCreated { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid UserID { get; set; }
        public string CreatedByName { get; set; }
    }
}

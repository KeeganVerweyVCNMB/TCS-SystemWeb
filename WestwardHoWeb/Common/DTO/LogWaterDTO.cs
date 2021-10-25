using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class LogWaterDTO
    {
        public Guid? WaterLogID { get; set; }
        public string Unit { get; set; }
        public string Name { get; set; }
        public string Usage { get; set; }
        public string Billed { get; set; }
        public string DateStart { get; set; }
        public string DateEnd { get; set; }
        public string DateCreated { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid UserID { get; set; }
    }
}

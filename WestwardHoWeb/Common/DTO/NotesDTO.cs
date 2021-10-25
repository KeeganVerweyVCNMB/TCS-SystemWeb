using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DTO
{
    public class NotesDTO
    {
        public Guid? NoteID { get; set; }
        public string Title { get; set; }
        public string Note { get; set; }
        public string DateCreated { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Guid UserID { get; set; }
        public string CreatedByName { get; set; }
    }
}

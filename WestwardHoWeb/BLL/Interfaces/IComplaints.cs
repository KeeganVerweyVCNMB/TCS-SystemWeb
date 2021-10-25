using Common.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface IComplaints
    {
        List<ComplaintsDTO> GetComplaints();
        bool AddComplaint(ComplaintsDTO dto);
        bool UpdateComplaintStatus(ComplaintsDTO dto);
        bool DeleteComplaint(Guid complaintID);
        bool LogWater(LogWaterDTO dto);
        List<NotesDTO> GetNotes();
        bool AddNote(NotesDTO dto);
        bool DeleteNote(Guid noteID);
        List<RulesDTO> GetRules();
        bool AddRule(RulesDTO dto);
        List<MeetingsDTO> GetMeetings();
        bool AddMeeting(MeetingsDTO dto);
        bool DeleteMeeting(Guid meetingID);
        List<UserDTO> GetReports();
        List<LogWaterDTO> GetWater();
        List<ComplaintsDTO> GetComplaintsByLoggedInUserID(Guid userID);
        List<LogWaterDTO> GetWaterByLoggedInUserID(Guid userID);
        List<UserDTO> GetCanUserViewComplaints(Guid userID);
    }
}

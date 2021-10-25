using Common.Models;
using System;
using System.Collections.Generic;

namespace DAL.Respositories.Interfaces
{
    public interface IComplaintsRepository
    {
        List<ComplaintsModel> GetComplaints();
        bool AddUpdateComplaint(ComplaintsModel model);
        ComplaintsModel GetComplaintByID(Guid complaintID);
        bool AddWaterLog(LogWaterModel model);
        List<NotesModel> GetNotes();
        bool AddUpdateNote(NotesModel model);
        NotesModel GetNoteByID(Guid noteID);
        List<RulesModel> GetRules();
        bool AddUpdateRule(RulesModel model);
        List<MeetingsModel> GetMeetings();
        bool AddUpdateMeeting(MeetingsModel model);
        MeetingsModel GetMeetingByID(Guid complaintID);
        List<UserModel> GetReports();
        List<LogWaterModel> GetWater();
        List<ComplaintsModel> GetComplaintsByLoggedInUserID(Guid userID);
        List<LogWaterModel> GetWaterByLoggedInUserID(Guid userID);
        List<UserModel> GetCanUserViewComplaints(Guid userID);
    }
}

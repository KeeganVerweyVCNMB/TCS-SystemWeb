using Common.DTO;
using Common.Models;
using DAL.Respositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Respositories
{
    public class ComplaintsRepository : BaseRepository<MainContext>, IComplaintsRepository
    {
        public ComplaintsRepository(MainContext context) : base(context) { }

        public List<ComplaintsModel> GetComplaints()
        {
            return _DatabaseContext.Complaint.Where(e => e.IsDeleted != true).ToList();
        }

        public bool AddUpdateComplaint(ComplaintsModel model)
        {
            try
            {
                if (model.ComplaintsID == new Guid())
                {
                    //Add
                    _DatabaseContext.Complaint.Add(model);
                }
                else
                {
                    //Update
                    _DatabaseContext.Complaint.Update(model);
                }
                return _DatabaseContext.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public ComplaintsModel GetComplaintByID(Guid complaintID)
        {
            return _DatabaseContext.Complaint.Where(e => e.ComplaintsID == complaintID).FirstOrDefault();
        }
        public bool AddWaterLog(LogWaterModel model)
        {
            try
            {
                if (model != null)
                {
                    //Add
                    _DatabaseContext.LogWater.Add(model);
                }
                return _DatabaseContext.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public List<NotesModel> GetNotes()
        {
            return _DatabaseContext.Note.Where(e => e.IsDeleted != true).ToList();
        }

        public bool AddUpdateNote(NotesModel model)
        {
            try
            {
                if (model.NoteID == new Guid())
                {
                    //Add
                    _DatabaseContext.Note.Add(model);
                }
                return _DatabaseContext.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public NotesModel GetNoteByID(Guid noteID)
        {
            return _DatabaseContext.Note.Where(e => e.NoteID == noteID).FirstOrDefault();
        }

        public List<RulesModel> GetRules()
        {
            return _DatabaseContext.Rule.Where(e => e.IsDeleted != true).ToList();
        }

        public bool AddUpdateRule(RulesModel model)
        {
            try
            {
                if (model.RuleID == new Guid())
                {
                    //Add
                    _DatabaseContext.Rule.Add(model);
                }
                return _DatabaseContext.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public List<MeetingsModel> GetMeetings()
        {
            return _DatabaseContext.Meeting.Where(e => e.IsDeleted != true).ToList();
        }

        public bool AddUpdateMeeting(MeetingsModel model)
        {
            try
            {
                if (model.MeetingID == new Guid())
                {
                    //Add
                    _DatabaseContext.Meeting.Add(model);
                }
                return _DatabaseContext.SaveChanges() > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public MeetingsModel GetMeetingByID(Guid meetingID)
        {
            return _DatabaseContext.Meeting.Where(e => e.MeetingID == meetingID).FirstOrDefault();
        }

        public List<UserModel> GetReports()
        {
            return _DatabaseContext.User.Where(e => e.IsDeleted != true).ToList();
        }

        public List<LogWaterModel> GetWater()
        {
            return _DatabaseContext.LogWater.Where(e => e.IsDeleted != true).OrderBy(x => x.Unit).ToList();
        }

        public List<ComplaintsModel> GetComplaintsByLoggedInUserID(Guid userID)
        {
            return _DatabaseContext.Complaint.Where(e => e.IsDeleted != true && e.UserID == userID).ToList();
        }

        public List<LogWaterModel> GetWaterByLoggedInUserID(Guid userID)
        {
            return _DatabaseContext.LogWater.Where(e => e.IsDeleted != true && e.UserID == userID).ToList();
        }

        public List<UserModel> GetCanUserViewComplaints(Guid userID)
        {
            return _DatabaseContext.User.Where(e => e.IsDeleted != true && e.UserID == userID).ToList();
        }
    }
}

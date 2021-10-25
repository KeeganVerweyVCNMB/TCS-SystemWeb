using BLL.Interfaces;
using Common.DTO;
using Common.Models;
using DAL.Respositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BLL
{
    public class Complaints : IComplaints
    {
        IComplaintsRepository _complaintsRepository { get; set; }

        public Complaints(IComplaintsRepository complaintsRepository)
        {
            _complaintsRepository = complaintsRepository;
        }

        public List<ComplaintsDTO> GetComplaints()
        {
            return _complaintsRepository.GetComplaints().Select(e => MapComplaintToDTO(e)).ToList();
        }

        public bool AddComplaint(ComplaintsDTO dto)
        {
            return _complaintsRepository.AddUpdateComplaint(MapComplaintToModel(dto));
        }

        public bool UpdateComplaintStatus(ComplaintsDTO dto)
        {
            ComplaintsModel model = _complaintsRepository.GetComplaintByID(dto.ComplaintsID.Value);
            model.ComplaintStatus = dto.ComplaintStatus;
            return _complaintsRepository.AddUpdateComplaint(model);
        }

        public bool DeleteComplaint(Guid complaintID)
        {
            ComplaintsModel model = _complaintsRepository.GetComplaintByID(complaintID);
            model.IsDeleted = true;
            return _complaintsRepository.AddUpdateComplaint(model);
        }

        private ComplaintsModel MapComplaintToModel(ComplaintsDTO dto)
        {
            return new ComplaintsModel()
            {
                ComplaintDescription = dto.ComplaintDescription,
                ComplaintsID = dto.ComplaintsID != null ? dto.ComplaintsID.Value : new Guid(),
                ComplaintStatus = dto.ComplaintStatus,
                ComplaintTitle = dto.ComplaintTitle,
                DateCreated = !string.IsNullOrWhiteSpace(dto.DateCreated) ? Convert.ToDateTime(dto.DateCreated) : GetSASTDateTime(DateTime.Now),
                IsDeleted = dto.IsDeleted,
                UserID = dto.UserID
            };
        }

        private ComplaintsDTO MapComplaintToDTO(ComplaintsModel model)
        {
            return new ComplaintsDTO()
            {
                ComplaintDescription = model.ComplaintDescription,
                ComplaintsID = model.ComplaintsID,
                ComplaintStatus = model.ComplaintStatus,
                ComplaintTitle = model.ComplaintTitle,
                DateCreated = model.DateCreated.ToString("dd MMM yyyy"),
                IsDeleted = model.IsDeleted,
                UserID = model.UserID,
                CreatedByName = model.User.Name + " " + model.User.Surname
            };
        }

        private static DateTime GetSASTDateTime(DateTime dateTime)
        {
            var x = TimeZoneInfo.GetSystemTimeZones();
            return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,
                TimeZoneInfo.FindSystemTimeZoneById("South Africa Standard Time"));
        }
        public bool LogWater(LogWaterDTO dto)
        {
            return _complaintsRepository.AddWaterLog(MapWaterLogToModel(dto));
        }
        private LogWaterModel MapWaterLogToModel(LogWaterDTO dto)
        {
            return new LogWaterModel()
            {
                Unit = dto.Unit,
                Name = dto.Name,
                Billed = dto.Billed,
                Usage = dto.Usage,
                DateStart = dto.DateStart,
                DateEnd = dto.DateEnd,
                DateCreated = !string.IsNullOrWhiteSpace(DateTime.Now.ToString()) ? Convert.ToDateTime(DateTime.Now.ToString()) : GetSASTDateTime(DateTime.Now),
                IsDeleted = dto.IsDeleted,
                UserID = dto.UserID
            };
        }
        public List<NotesDTO> GetNotes()
        {
            return _complaintsRepository.GetNotes().Select(e => MapNoteToDTO(e)).ToList();
        }

        public bool AddNote(NotesDTO dto)
        {
            return _complaintsRepository.AddUpdateNote(MapNoteToModel(dto));
        }

        public bool DeleteNote(Guid noteID)
        {
            NotesModel model = _complaintsRepository.GetNoteByID(noteID);
            model.IsDeleted = true;
            return _complaintsRepository.AddUpdateNote(model);
        }
        private NotesModel MapNoteToModel(NotesDTO dto)
        {
            return new NotesModel()
            {
                NoteID = dto.NoteID != null ? dto.NoteID.Value : new Guid(),
                Title = dto.Title,
                Note = dto.Note,
                DateCreated = !string.IsNullOrWhiteSpace(dto.DateCreated) ? Convert.ToDateTime(dto.DateCreated) : GetSASTDateTime(DateTime.Now),
                IsDeleted = dto.IsDeleted,
                UserID = dto.UserID
            };
        }

        private NotesDTO MapNoteToDTO(NotesModel model)
        {
            return new NotesDTO()
            {
                NoteID = model.NoteID,
                Note = model.Note,
                Title = model.Title,
                DateCreated = model.DateCreated.ToString("dd MMM yyyy"),
                IsDeleted = model.IsDeleted,
                UserID = model.UserID,
                CreatedByName = model.User.Name + " " + model.User.Surname
            };
        }

        public List<RulesDTO> GetRules()
        {
            return _complaintsRepository.GetRules().Select(e => MapRuleToDTO(e)).ToList();
        }

        public bool AddRule(RulesDTO dto)
        {
            return _complaintsRepository.AddUpdateRule(MapRuleToModel(dto));
        }

        private RulesModel MapRuleToModel(RulesDTO dto)
        {
            return new RulesModel()
            {
                RuleID = dto.RuleID != null ? dto.RuleID.Value : new Guid(),
                Title = dto.Title,
                Rule = dto.Rule,
                DateCreated = !string.IsNullOrWhiteSpace(dto.DateCreated) ? Convert.ToDateTime(dto.DateCreated) : GetSASTDateTime(DateTime.Now),
                IsDeleted = dto.IsDeleted,
                UserID = dto.UserID
            };
        }

        private RulesDTO MapRuleToDTO(RulesModel model)
        {
            return new RulesDTO()
            {
                RuleID = model.RuleID,
                Rule = model.Rule,
                Title = model.Title,
                DateCreated = model.DateCreated.ToString("dd MMM yyyy"),
                IsDeleted = model.IsDeleted,
                UserID = model.UserID,
                CreatedByName = model.User.Name + " " + model.User.Surname
            };
        }

        public List<MeetingsDTO> GetMeetings()
        {
            return _complaintsRepository.GetMeetings().Select(e => MapMeetingToDTO(e)).ToList();
        }

        public bool AddMeeting(MeetingsDTO dto)
        {
            return _complaintsRepository.AddUpdateMeeting(MapMeetingToModel(dto));
        }

        public bool DeleteMeeting(Guid meetingID)
        {
            MeetingsModel model = _complaintsRepository.GetMeetingByID(meetingID);
            model.IsDeleted = true;
            return _complaintsRepository.AddUpdateMeeting(model);
        }
        private MeetingsModel MapMeetingToModel(MeetingsDTO dto)
        {
            return new MeetingsModel()
            {
                MeetingID = dto.MeetingID != null ? dto.MeetingID.Value : new Guid(),
                Title = dto.Title,
                Host = dto.Host,
                Link = dto.Link,
                DateCreated = !string.IsNullOrWhiteSpace(dto.DateCreated) ? Convert.ToDateTime(dto.DateCreated) : GetSASTDateTime(DateTime.Now),
                IsDeleted = dto.IsDeleted,
                UserID = dto.UserID
            };
        }

        private MeetingsDTO MapMeetingToDTO(MeetingsModel model)
        {
            return new MeetingsDTO()
            {
                MeetingID = model.MeetingID,
                Host = model.Host,
                Link = model.Link,
                Title = model.Title,
                DateCreated = model.DateCreated.ToString("dd MMM yyyy"),
                IsDeleted = model.IsDeleted,
                UserID = model.UserID,
                CreatedByName = model.User.Name + " " + model.User.Surname
            };
        }

        public List<UserDTO> GetReports()
        {
            return _complaintsRepository.GetReports().Select(e => MapReportsToDTO(e)).ToList();
        }

        private UserDTO MapReportsToDTO(UserModel model)
        {
            return new UserDTO()
            {
                Name = model.Name,
                Surname = model.Surname,
                EmailAddress = model.EmailAddress,
                PhoneNumber = model.PhoneNumber,
                MoveInYear = model.MoveInYear,
                UnitNumber = model.UnitNumber,
                UserID = model.UserID
            };
        }

        public List<LogWaterDTO> GetWater()
        {
            return _complaintsRepository.GetWater().Select(e => MapWaterToDTO(e)).ToList();
        }

        private LogWaterDTO MapWaterToDTO(LogWaterModel model)
        {
            return new LogWaterDTO()
            {
                Name = model.Name,
                WaterLogID = model.WaterLogID,
                Billed = model.Billed,
                Unit = model.Unit,
                Usage = model.Usage,
                DateStart = model.DateStart,
                DateEnd = model.DateEnd,
                DateCreated = model.DateCreated.ToString("dd MMM yyyy"),
                IsDeleted = model.IsDeleted,
                UserID = model.UserID
            };
        }

        public List<ComplaintsDTO> GetComplaintsByLoggedInUserID(Guid userID)
        {
            return _complaintsRepository.GetComplaintsByLoggedInUserID(userID).Select(e => MapComplaintsByLoggedInUserIDToDTO(e)).ToList();
        }

        private ComplaintsDTO MapComplaintsByLoggedInUserIDToDTO(ComplaintsModel model)
        {
            return new ComplaintsDTO()
            {
                ComplaintDescription = model.ComplaintDescription,
                ComplaintsID = model.ComplaintsID,
                ComplaintStatus = model.ComplaintStatus,
                ComplaintTitle = model.ComplaintTitle,
                DateCreated = model.DateCreated.ToString("dd MMM yyyy"),
                IsDeleted = model.IsDeleted,
                UserID = model.UserID,
                CreatedByName = model.User.Name + " " + model.User.Surname
            };
        }

        public List<LogWaterDTO> GetWaterByLoggedInUserID(Guid userID)
        {
            return _complaintsRepository.GetWaterByLoggedInUserID(userID).Select(e => MapWaterByLoggedInUserIDToDTO(e)).ToList();
        }

        private LogWaterDTO MapWaterByLoggedInUserIDToDTO(LogWaterModel model)
        {
            return new LogWaterDTO()
            {
                Name = model.Name,
                WaterLogID = model.WaterLogID,
                Billed = model.Billed,
                Unit = model.Unit,
                Usage = model.Usage,
                DateStart = model.DateStart,
                DateEnd = model.DateEnd,
                DateCreated = model.DateCreated.ToString("dd MMM yyyy"),
                IsDeleted = model.IsDeleted,
                UserID = model.UserID
            };
        }

        public List<UserDTO> GetCanUserViewComplaints(Guid userID)
        {
            return _complaintsRepository.GetCanUserViewComplaints(userID).Select(e => MapCanUserViewComplaintsToDTO(e)).ToList();
        }

        private UserDTO MapCanUserViewComplaintsToDTO(UserModel model)
        {
            return new UserDTO()
            {
                UserID = model.UserID,
                IsAdmin = model.IsAdmin
            };
        }
    }
}

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

        public bool DeleteComplaint(ComplaintsDTO dto)
        {
            ComplaintsModel model = _complaintsRepository.GetComplaintByID(dto.ComplaintsID.Value);
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
    }
}

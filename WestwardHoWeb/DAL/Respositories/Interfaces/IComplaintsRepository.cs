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
    }
}

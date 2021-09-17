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
        bool DeleteComplaint(ComplaintsDTO dto);
    }
}

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
    }
}

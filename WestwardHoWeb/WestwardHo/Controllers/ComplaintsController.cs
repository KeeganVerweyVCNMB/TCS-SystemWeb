using BLL.Interfaces;
using Common.DTO;
using Microsoft.AspNetCore.Mvc;

namespace ComplaintSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ComplaintsController : ControllerBase
    {
        private IComplaints _complaints { get; set; }
        public ComplaintsController(IComplaints complaints)
        {
            _complaints = complaints;
        }

        [HttpGet]
        [Route("GetComplaints")]
        public JsonResult GetComplaints()
        {
            return new JsonResult(_complaints.GetComplaints());
        }

        [HttpPost]
        [Route("AddComplaint")]
        public JsonResult AddComplaint([FromBody] ComplaintsDTO dto)
        {
            return new JsonResult(_complaints.AddComplaint(dto));
        }

        [HttpPost]
        [Route("UpdateComplaintStatus")]
        public JsonResult UpdateComplaintStatus([FromBody] ComplaintsDTO dto)
        {
            return new JsonResult(_complaints.UpdateComplaintStatus(dto));
        }

        [HttpPost]
        [Route("DeleteComplaint")]
        public JsonResult DeleteComplaint([FromBody] ComplaintsDTO dto)
        {
            return new JsonResult(_complaints.DeleteComplaint(dto));
        }
    }
}

using BLL.Interfaces;
using Common.DTO;
using Microsoft.AspNetCore.Mvc;
using System;

namespace WestwardHoSystem.Controllers
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

        [HttpGet]
        [Route("DeleteComplaint")]
        public JsonResult DeleteComplaint(string complaintID)
        {
            return new JsonResult(_complaints.DeleteComplaint(Guid.Parse(complaintID)));
        }

        [HttpPost]
        [Route("LogWater")]
        public JsonResult LogWater([FromBody] LogWaterDTO dto)
        {
            return new JsonResult(_complaints.LogWater(dto));
        }

        [HttpGet]
        [Route("GetNotes")]
        public JsonResult GetNotes()
        {
            return new JsonResult(_complaints.GetNotes());
        }

        [HttpPost]
        [Route("AddNote")]
        public JsonResult AddNote([FromBody] NotesDTO dto)
        {
            return new JsonResult(_complaints.AddNote(dto));
        }

        [HttpGet]
        [Route("DeleteNote")]
        public JsonResult DeleteNote(string noteID)
        {
            return new JsonResult(_complaints.DeleteNote(Guid.Parse(noteID)));
        }

        [HttpGet]
        [Route("GetRules")]
        public JsonResult GetRules()
        {
            return new JsonResult(_complaints.GetRules());
        }

        [HttpPost]
        [Route("AddRule")]
        public JsonResult AddRule([FromBody] RulesDTO dto)
        {
            return new JsonResult(_complaints.AddRule(dto));
        }

        [HttpGet]
        [Route("GetMeetings")]
        public JsonResult GetMeetings()
        {
            return new JsonResult(_complaints.GetMeetings());
        }

        [HttpPost]
        [Route("AddMeeting")]
        public JsonResult AddMeeting([FromBody] MeetingsDTO dto)
        {
            return new JsonResult(_complaints.AddMeeting(dto));
        }

        [HttpGet]
        [Route("DeleteMeeting")]
        public JsonResult DeleteMeeting(string meetingID)
        {
            return new JsonResult(_complaints.DeleteMeeting(Guid.Parse(meetingID)));
        }

        [HttpGet]
        [Route("GetReports")]
        public JsonResult GetReports()
        {
            return new JsonResult(_complaints.GetReports());
        }

        [HttpGet]
        [Route("GetWater")]
        public JsonResult GetWater()
        {
            return new JsonResult(_complaints.GetWater());
        }

        [HttpGet]
        [Route("GetWaterByLoggedInUserID")]
        public JsonResult GetWaterByLoggedInUserID(string userID)
        {
            return new JsonResult(_complaints.GetWaterByLoggedInUserID(Guid.Parse(userID)));
        }

        [HttpGet]
        [Route("GetComplaintsByLoggedInUserID")]
        public JsonResult GetComplaintsByLoggedInUserID(string userID)
        {
            return new JsonResult(_complaints.GetComplaintsByLoggedInUserID(Guid.Parse(userID)));
        }

        [HttpGet]
        [Route("GetCanUserViewComplaints")]
        public JsonResult GetCanUserViewComplaints(string userID)
        {
            return new JsonResult(_complaints.GetCanUserViewComplaints(Guid.Parse(userID)));
        }
    }
}

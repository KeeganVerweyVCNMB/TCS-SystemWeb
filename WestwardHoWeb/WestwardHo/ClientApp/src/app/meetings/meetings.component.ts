import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';
import { AddMeetingComponent } from '../../shared/add-meeting/add-meeting.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
})
export class MeetingsComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  userID: string = "";
  meetings: Array<any> = [];
  meetingsList: Array<any> = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");
    this.getMeeting();
  }

  getMeeting() {
    this.isLoading = true;
    this.meetings = [];
    this.meetingsList = [];
    this.systemService.getMeetings().then(results => {
      if (results != null && results != undefined && results.length > 0) {
        this.meetings = results;
        this.meetingsList = results;
      }
      this.isLoading = false;
    });
  }

  deleteMeeting(meetingID) {
    this.isLoading = true;
    this.systemService.deleteMeeting(meetingID).then(e => {
      this.getMeeting();
    });
  }

  addMeeting() {
    var modalRef = this.modalService.open(AddMeetingComponent, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    modalRef.result.then(response => {
      this.isLoading = true;
      this.getMeeting();
    });
  }

  navigateMeeting(meetingLink) {
    window.open(meetingLink);
  }
}

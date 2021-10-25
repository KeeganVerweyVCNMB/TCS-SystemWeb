import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { log } from 'util';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss'],
})
export class AddMeetingComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  userID: string = "";
  meetingError: boolean = false;
  meetingSuccess: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");

    this.formObject = this.formBuilder.group({
      iD: ['', Validators.nullValidator],
      title: ['', Validators.required],
      host: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  get formControls() {
    return this.formObject.controls;
  }

  addMeeting() {
    this.isLoading = true;
    this.submitted = true;

    if (this.formObject.invalid) {
      this.isLoading = false;
      return;
    }

    this.systemService.addMeeting(this.formControls.title.value, this.formControls.host.value, this.formControls.link.value, this.userID).then(response => {
      if (response == null) {
        this.isLoading = false;
        this.meetingError = true;
      }
      else {
        this.isLoading = false;
        this.meetingSuccess = true;
        this.formControls.title.setValue('');
        this.formControls.host.setValue('');
        this.formControls.link.setValue('');
        this.submitted = false;
      }
    });
  }

  cancel() {
    this.submitted = false;
    this.meetingError = false;
    this.formControls.title.setValue('');
    this.formControls.host.setValue('');
    this.formControls.link.setValue('');
  }

  clearErrors() {
    this.submitted = false;
    this.meetingError = false;
    this.meetingSuccess = false;
  }
}

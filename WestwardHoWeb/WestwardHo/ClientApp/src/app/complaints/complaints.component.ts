import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-complaints-data',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
})
export class ComplaintsComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  userID: string = "";
  complaintError: boolean = false;
  complaintSuccess: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");

    this.formObject = this.formBuilder.group({
      iD: ['', Validators.nullValidator],
      complaintTitle: ['', Validators.required],
      complaintDescription: ['', Validators.required],
    });    
  }

  get formControls() {
    return this.formObject.controls;
  }

  addComplaint() {
    this.isLoading = true;
    this.submitted = true;

    if (this.formObject.invalid) {
      this.isLoading = false;
      return;
    }

    this.systemService.addComplaint(this.formControls.complaintTitle.value, this.formControls.complaintDescription.value, this.userID).then(response => {
        if (response == null) {
          this.isLoading = false;
          this.complaintError = true;
        }
        else {
          this.isLoading = false;
          this.complaintSuccess = true;
          this.formControls.complaintTitle.setValue('');
          this.formControls.complaintDescription.setValue('');
          this.submitted = false;
        }
      });
  }

  cancel() {
    this.submitted = false;
    this.complaintError = false;
    this.formControls.complaintTitle.setValue('');
    this.formControls.complaintDescription.setValue('');
  }

  clearErrors() {
    this.submitted = false;
    this.complaintError = false;
    this.complaintSuccess = false;
  }
}

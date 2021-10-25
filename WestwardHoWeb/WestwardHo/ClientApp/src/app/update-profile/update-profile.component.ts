import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-update-profile-component',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  updateError: boolean = false;
  userID: string = "";
  updateSuccess: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService  ) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");
    this.formObject = this.formBuilder.group({
      userID: ['', Validators.nullValidator],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      emailAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      unitNumber: ['', Validators.required],
      moveInYear: ['', Validators.required],
    });
    this.getUserProfile();
  }

  getUserProfile() {
    this.systemService.getUserByID(this.userID).then(result => {
      this.formObject.patchValue(result);
    });
  }

  get formControls() {
    return this.formObject.controls;
  }

  updateProfile() {
    this.isLoading = true;
    this.submitted = true;

    if (this.formObject.invalid) {
      this.isLoading = false;
      return;
    }
    this.systemService.updateUserProfile(this.formControls.name.value, this.formControls.surname.value, this.formControls.emailAddress.value,
      this.formControls.phoneNumber.value, this.formControls.unitNumber.value, this.formControls.moveInYear.value, this.userID).then(response => {
      if (response == null) {
        this.isLoading = false;
        this.updateError = true;
      }
      else {
        this.isLoading = false;
        this.updateSuccess = true;
        localStorage.setItem("username", response.name + " " + response.surname);
        this.dataService.sendUserID(response.userID);        
      }
    });
  }

  cancel() {
    this.submitted = false;
    this.updateError = false;
    this.formControls.name.setValue('');
    this.formControls.surname.setValue('');
    this.formControls.emailAddress.setValue('');
    this.formControls.phoneNumber.setValue('');
    this.formControls.unitNumber.setValue('');
    this.formControls.moveInYear.setValue('');
  }

  clearErrors() {
    this.submitted = false;
    this.updateError = false;
    this.updateSuccess = false;
  }
}

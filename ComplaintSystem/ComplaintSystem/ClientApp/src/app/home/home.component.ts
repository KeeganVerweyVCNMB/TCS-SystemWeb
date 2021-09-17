import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { log } from 'util';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  loginError: boolean = false;
  passwordTypeText: string = 'password';
  passwordText: string = 'Show Password';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService) { }

  ngOnInit() {

    var userID = localStorage.getItem("userID");
    if (userID != null) {
      this.router.navigate(["/complaints"]);
    }

    this.formObject = this.formBuilder.group({
      iD: ['', Validators.nullValidator],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.formObject.controls;
  }

  login() {
    this.isLoading = true;
    this.submitted = true;

    if (this.formObject.invalid) {
      this.isLoading = false;
      return;
    }

    this.systemService.login(this.formControls.email.value, this.formControls.password.value).then(response => {
      if (response == null) {
        this.isLoading = false;
        this.loginError = true;
      }
      else {
        localStorage.setItem("username", response.name + " " + response.surname);
        this.dataService.sendUserID(response.userID);
        this.isLoading = false;
        this.router.navigate(['/complaints']);
      }
    });
  }

  cancel() {
    this.submitted = false;
    this.loginError = false;
    this.formControls.email.setValue('');
    this.formControls.password.setValue('');    
  }

  clearErrors() {
    this.submitted = false;
    this.loginError = false;
  }

  showHidePassword() {
    if (this.passwordTypeText == 'password') {
      this.passwordTypeText = 'text';
      this.passwordText = 'Hide Password';
    }
    else {
      this.passwordTypeText = 'password';
      this.passwordText = 'Show Password';
    }
  }
}

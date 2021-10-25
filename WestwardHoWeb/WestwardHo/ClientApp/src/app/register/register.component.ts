import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  registerError: boolean = false;
  passwordTypeText: string = 'password';
  passwordText: string = 'Show Password';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService  ) { }

  ngOnInit() {
    this.formObject = this.formBuilder.group({
      iD: ['', Validators.nullValidator],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      emailAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      unitNumber: ['', Validators.required],
      moveInYear: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.formObject.controls;
  }

  register() {
    this.isLoading = true;
    this.submitted = true;

    if (this.formObject.invalid) {
      this.isLoading = false;
      return;
    }

    this.systemService.register(this.formControls.name.value, this.formControls.surname.value, this.formControls.emailAddress.value,
      this.formControls.phoneNumber.value, this.formControls.unitNumber.value, this.formControls.moveInYear.value, this.formControls.password.value).then(response => {
      if (response == null) {
        this.isLoading = false;
        this.registerError = true;
      }
      else {
        this.dataService.sendUserID(response.userID);
        this.isLoading = false;
        this.router.navigate(['/']);
      }
    });
  }

  cancel() {
    this.submitted = false;
    this.registerError = false;
    this.formControls.name.setValue('');
    this.formControls.surname.setValue('');
    this.formControls.emailAddress.setValue('');
    this.formControls.phoneNumber.setValue('');
    this.formControls.unitNumber.setValue('');
    this.formControls.moveInYear.setValue('');
    this.formControls.password.setValue('');
  }

  clearErrors() {
    this.submitted = false;
    this.registerError = false;
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { log } from 'util';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-log-water',
  templateUrl: './log-water.component.html',
  styleUrls: ['./log-water.component.scss'],
})
export class LogWaterComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  logError: boolean = false;
  waterLogSuccess: boolean = false;
  userID: string = "";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");
    this.formObject = this.formBuilder.group({
      iD: ['', Validators.nullValidator],
      unit: ['', Validators.required],
      name: ['', Validators.required],
      usage: ['', Validators.required],
      billed: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
    });
  }

  get formControls() {
    return this.formObject.controls;
  }

  logWater() {
    this.isLoading = true;
    this.submitted = true;

    if (this.formObject.invalid) {
      this.isLoading = false;
      return;
    }

    this.systemService.logWater(this.userID, this.formControls.unit.value, this.formControls.name.value, this.formControls.usage.value,
      this.formControls.billed.value, this.formControls.dateStart.value, this.formControls.dateEnd.value).then(response => {
        if (response == null) {
          this.isLoading = false;
          this.logError = true;
        }
        else {
          this.isLoading = false;
          this.submitted = false;
          this.waterLogSuccess = true;
          this.formControls.unit.setValue('');
          this.formControls.name.setValue('');
          this.formControls.usage.setValue('');
          this.formControls.billed.setValue('');
          this.formControls.dateStart.setValue('');
          this.formControls.dateEnd.setValue('');
        }
      });
  }

  clearErrors() {
    this.submitted = false;
    this.logError = false;
    this.waterLogSuccess = false;
  }

  cancel() {
    this.submitted = false;
    this.logError = false;
    this.waterLogSuccess = false;
    this.formControls.unit.setValue('');
    this.formControls.name.setValue('');
    this.formControls.usage.setValue('');
    this.formControls.billed.setValue('');
    this.formControls.dateStart.setValue('');
    this.formControls.dateEnd.setValue('');
  }
    
}

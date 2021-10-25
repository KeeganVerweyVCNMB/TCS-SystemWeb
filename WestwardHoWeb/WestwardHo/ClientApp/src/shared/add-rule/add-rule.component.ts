import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { log } from 'util';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.scss'],
})
export class AddRuleComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  userID: string = "";
  ruleError: boolean = false;
  ruleSuccess: boolean = false;

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
      rule: ['', Validators.required],
    });
  }

  get formControls() {
    return this.formObject.controls;
  }

  addRule() {
    this.isLoading = true;
    this.submitted = true;

    if (this.formObject.invalid) {
      this.isLoading = false;
      return;
    }

    this.systemService.addRule(this.formControls.title.value, this.formControls.rule.value, this.userID).then(response => {
      if (response == null) {
        this.isLoading = false;
        this.ruleError = true;
      }
      else {
        this.isLoading = false;
        this.ruleSuccess = true;
        this.formControls.title.setValue('');
        this.formControls.rule.setValue('');
        this.submitted = false;
      }
    });
  }

  cancel() {
    this.submitted = false;
    this.ruleError = false;
    this.formControls.title.setValue('');
    this.formControls.rule.setValue('');
  }

  clearErrors() {
    this.submitted = false;
    this.ruleError = false;
    this.ruleSuccess = false;
  }
}

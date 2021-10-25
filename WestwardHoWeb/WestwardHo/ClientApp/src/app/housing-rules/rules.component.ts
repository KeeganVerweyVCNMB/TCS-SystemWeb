import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { log } from 'util';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';
import { AddRuleComponent } from '../../shared/add-rule/add-rule.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  userID: string = "";
  rules: Array<any> = [];
  rulesList: Array<any> = [];
  isAdmin: Array<any> = [];
  isAdminList: Array<any> = [];
  isAdminUser: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");
    this.getRule();
    this.canUpdateStatus();
  }

  canUpdateStatus() {
    if (this.userID != null) {
      this.systemService.getCanUserViewComplaints(this.userID).then(results => {
        if (results != null && results != undefined && results.length > 0) {
          this.isAdmin = results;
          this.isAdminList = results;

          if (this.isAdmin[0].isAdmin) {
            this.isAdminUser = true;
          }
          else {
            this.isAdminUser = false;
          }
        }
      });
    }
  }

  getRule() {
    this.isLoading = true;
    this.systemService.getRules().then(results => {
      if (results != null && results != undefined && results.length > 0) {
        this.rules = results;
        this.rulesList = results;
      }
      this.isLoading = false;
    });
  }

  addRule() {
    var modalRef = this.modalService.open(AddRuleComponent, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    modalRef.result.then(response => {
      this.isLoading = true;
      this.getRule();
    });
  }
}

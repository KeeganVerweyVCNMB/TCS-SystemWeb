import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { log } from 'util';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  formObject: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  userID: string = "";
  reports: Array<any> = [];
  reportsList: Array<any> = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");
    this.getReports();
  }

  getReports() {
    this.isLoading = true;
    this.systemService.getReports().then(results => {
      if (results != null && results != undefined && results.length > 0) {
        this.reports = results;
        this.reportsList = results;
      }
      this.isLoading = false;
    });
  }

  filterTS() {
    var term = this.searchTerm;

    if (term === '') {
      this.reports = this.reportsList;
    }
    else {
      this.reports = this.reportsList.filter(function (item) {
        return item.emailAddress.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
          item.name.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
          item.surname.toLowerCase().indexOf(term.toLowerCase()) > -1
      });
    }
  }

  navigateToPreview(userID) {
    this.router.navigate(['/report-preview/' + userID]);
  }
}

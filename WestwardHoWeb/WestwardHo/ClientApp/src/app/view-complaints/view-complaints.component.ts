import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-view-complaints-data',
  templateUrl: './view-complaints.component.html',
  styleUrls: ['./view-complaints.component.scss'],
})
export class ViewComplaintsComponent implements OnInit {
  isLoading: boolean = true;
  userID: string = "";
  complaints: Array<any> = [];
  complaintsList: Array<any> = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private systemService: SystemService,
    private dataService: DataService) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");
    this.getComplaint();
  }

  filterTCS() {
    var term = this.searchTerm;

    if (term === '') {
      this.complaints = this.complaintsList;
    }
    else {
      this.complaints = this.complaintsList.filter(function (item) {
        return item.complaintTitle.toLowerCase().indexOf(term.toLowerCase()) > -1
      });
    }
  }

  getComplaint() {
    this.systemService.getComplaints().then(results => {
      if (results != null && results != undefined && results.length > 0) {
        this.complaints = results;
        this.complaintsList = results;
      }
      this.isLoading = false;
    });
  }

  updateStatus(complaintID, statusText) {
    this.systemService.updateComplaintStatus(complaintID, statusText).then(e => { });
  }

  deleteComplaint(complaintID) {
    this.isLoading = true;
    this.systemService.deleteComplaint(complaintID).then(e => {
      this.getComplaint();
    });
  }
}

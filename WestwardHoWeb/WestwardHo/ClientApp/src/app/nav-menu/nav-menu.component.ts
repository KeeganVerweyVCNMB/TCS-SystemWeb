import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  subscription: Subscription;
  isLoggedIn: boolean = false;
  username: string = "";
  userID: string = "";
  isAdmin: Array<any> = [];
  isAdminList: Array<any> = [];
  isAdminUser: boolean = false;

  constructor(private dataService: DataService, private router: Router, private systemService: SystemService) {
    var localLoggedInStatus = localStorage.getItem("isLoggedIn");
    this.username = localStorage.getItem("username");
    this.userID = localStorage.getItem("userID");
    this.setPermissions();

    if (localLoggedInStatus != null) {
      this.isLoggedIn = JSON.parse(localLoggedInStatus);
    }
    this.subscription = this.dataService.getUserID().subscribe(message => {
      this.isAdminUser = false;
      this.username = localStorage.getItem("username");
      if (message != undefined && message != null) {
        this.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userID", message.text);
        this.userID = message.text;
        this.username = localStorage.getItem("username");
      }
      else {
        this.isLoggedIn = false;
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("userID");
        localStorage.removeItem("username");
        this.username = "";
        this.userID = null;
      }

      this.setPermissions();
    });
  }

  setPermissions() {
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

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.dataService.clearUserID();
    this.router.navigate(['/']);
  }
}

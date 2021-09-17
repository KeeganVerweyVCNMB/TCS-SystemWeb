import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';

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

  constructor(private dataService: DataService, private router: Router) {
    var localLoggedInStatus = localStorage.getItem("isLoggedIn");
    this.username = localStorage.getItem("username");
    if (localLoggedInStatus != null) {
      this.isLoggedIn = JSON.parse(localLoggedInStatus);
    }
    this.subscription = this.dataService.getUserID().subscribe(message => {
      this.username = localStorage.getItem("username");
      if (message != undefined && message != null) {
        this.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userID", message.text);
        this.username = localStorage.getItem("username");
      }
      else {
        this.isLoggedIn = false;
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("userID");
        localStorage.removeItem("username");
        this.username = "";
      }
    });
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

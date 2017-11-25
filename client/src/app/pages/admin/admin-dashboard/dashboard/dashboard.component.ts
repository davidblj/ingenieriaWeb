import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  username;

  constructor() { }

  ngOnInit() {
    const userInformation = JSON.parse(localStorage.getItem('currentUser'));

    if(userInformation) {
      this.username = userInformation.user;
    }
  }

}

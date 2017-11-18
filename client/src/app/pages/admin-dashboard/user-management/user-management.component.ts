import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../../bank-services/account.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  transactions;
  showMessage = true;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  onEnterPressed(event) {

    this.showMessage = false;

    console.log(event.target.value);
    this.accountService.getRecord(event.target.value).subscribe(
      (response) => {

        console.log(response);
        if(response.message) {
          console.log('working');
          this.showMessage = true;
        }

        this.transactions = response.tx;
        console.log(this.transactions);
        // todo: create a global variable or pass down a value to a new component
      }
    )
  }

  getDate(dateString: string) {

    let date:Date = new Date(dateString);
    console.log(typeof date);
    console.log(date);
    let formattedDate = [
      date.getMonth(),
      date.getDay(),
      date.getFullYear()
    ];

    return formattedDate.join("/");
  }

  getValue(value: string, type: string) {

    let symbol;
    if(type === 'accredit') {
      symbol = '+';
    } else {
      symbol = '-';
    }

    return (symbol + value);
  }
}

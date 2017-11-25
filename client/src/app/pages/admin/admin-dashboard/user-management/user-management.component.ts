import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../../../bank-services/account.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  transactions = [];
  clientAccount;
  showMessage = true;
  message;
  showInput = false;
  credit;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  onSubmitAccount(event) {

    this.showMessage = false;
    this.clientAccount = event.target.value;
    this.transactions = [];

    this.accountService.getRecord(event.target.value).subscribe(
      (response) => {

        if(response.message) {
          this.showMessage = true;

          this.accountService.confirmAccount(event.target.value).subscribe(
            (exists) => {

              if(exists) {
                this.message = 'El usuario aun no tiene historial de transacciones';
                this.showInput = true;
              } else {
                this.message = 'Sin resultados';
                this.showInput = false;
              }
            }
          )

        } else {
          this.showMessage = false;
          this.showInput = true;
          this.transactions = response.tx;
          this.clientAccount = response.account_number;
        }
      }
    )
  }

  getDate(dateString: string) {

    let date:Date = new Date(dateString);
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

  onSubmitCredit(event) {

    let credit = {
      account_number: this.clientAccount,
      value: event.target.value,
      place: 'bank'
    };

    console.log(credit);
    this.accountService.accreditAccount(credit).subscribe(
      (response) => {
        console.log(response.transaction);
        this.message = '';
        this.transactions.push(response.transaction);
        (<HTMLInputElement>document.getElementById("credit")).value = '0';
      }
    )
  }
}

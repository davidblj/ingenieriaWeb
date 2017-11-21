import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../../../bank-services/account.service';

@Component({
  selector: 'app-transactions-record',
  templateUrl: './transactions-record.component.html',
  styleUrls: ['./transactions-record.component.scss']
})
export class TransactionsRecordComponent implements OnInit {

  loginForm: FormGroup;
  response: boolean = true;
  balance;
  transactions;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      account : '10202130267',
      password: 'david'
    })
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

  public onSubmit() {

    this.accountService.getAccountStatus(this.loginForm.value).subscribe(
      (accountDetails) => {

        this.response = false;
        this.transactions = accountDetails.record.tx;
        this.balance = accountDetails.balance;
      },
      () => {
        this.response = true;
      }
    )
  }
}

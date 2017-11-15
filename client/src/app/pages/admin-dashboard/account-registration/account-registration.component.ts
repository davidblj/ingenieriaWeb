import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.scss']
})
export class AccountRegistrationComponent implements OnInit {

  accountForm: FormGroup;
  accountData;

  constructor(private formBuilder: FormBuilder,
              ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.accountForm = this.formBuilder.group({
      id: '',
      password: '',
      balance: ''
    })
  }

  onSubmit() {
    this.accountData = this.accountForm.value;
    this.accountData['account_number'] = this.createUniqueId();

    console.log(this.accountData);
    // todo: invoke service
  }

  createUniqueId(): string {
    let date = new Date();
    let components = [
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];

    return components.join("");
  }
}

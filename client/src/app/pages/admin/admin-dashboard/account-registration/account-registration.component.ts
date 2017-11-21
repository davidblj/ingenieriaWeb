import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../../../../bank-services/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.scss']
})
export class AccountRegistrationComponent implements OnInit {

  accountForm: FormGroup;
  accountData;
  createdUser;
  errorMessage = false;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private modalService: NgbModal) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.accountForm = this.formBuilder.group({
      identification: '',
      password: '',
      balance: ''
    })
  }

  onSubmit(content) {
    this.accountData = this.accountForm.value;
    this.accountData['account_number'] = this.createUniqueId();
    console.log(this.accountData);

    this.accountService.createAccount(this.accountData).subscribe(
      (createdUser) => {
        this.accountForm.reset();
        this.createdUser = createdUser;
        this.modalService.open(content);
      },
      (errorMessage) => {
        // todo: display an error message
        console.log(errorMessage);
        this.errorMessage = errorMessage;
      }
    )
  }

  createUniqueId(): string {
    let date = new Date();
    let components = [
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      (Math.floor(Math.random() * 9))
    ];

    return components.join("");
  }
}

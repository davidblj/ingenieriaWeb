import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'
import {UserModel} from "./userModel";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loginData: UserModel;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService) {
    this.createForm();
  }

  ngOnInit() {
  }

  public createForm() {
    this.formLogin = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  public onSubmit() {
    this.loginData = this.formLogin.value;

    // this.loginService.authenticate()
  }
}

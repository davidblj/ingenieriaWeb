import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  username = 'David';
  show = false;
  error;

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {

  }

  public createForm() {
    this.signUpForm = this.formBuilder.group({
      username: '',
      password: '',
      identification: '',
      role: 'client'
    });
  }

  onSubmit() {
    let user = this.signUpForm.value;
    this.username =  user.username;

    this.loginService.signUp(user).subscribe(
      () => {
        this.show = true;
      },
      () => {
        this.error = 'las credenciales ingresadas son invalidas';
      }
    )
  }
}

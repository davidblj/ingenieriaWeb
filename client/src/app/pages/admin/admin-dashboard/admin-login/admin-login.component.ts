import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  formLogin: FormGroup;
  errmess: string;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) {
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

    this.loginService.authenticate(this.formLogin.value).subscribe(
      (role) => {
          this.router.navigate(['/bank']);

          // todo: fake a real authentication (destroy local storage for users with undesired roles)
      },
      () => {
        this.errmess = 'Incorrect Username or Password';
      }
    );
  }
}

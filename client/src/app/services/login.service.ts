import { Injectable } from '@angular/core';
import {UserModel} from "../pages/login/userModel";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginService {

  constructor() { }

  authenticate(user: UserModel): Observable<UserModel> {
    return null;
  }

}

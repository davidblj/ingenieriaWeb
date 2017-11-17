import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {

  constructor(private restangular: Restangular) { }

  createAccount(accountDetails: Object): Observable<any>{

    return this.restangular.all('bank/registerAccount').post(accountDetails);
  }


}

import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {

  constructor(private restangular: Restangular) { }

  createAccount(accountDetails: Object): Observable<any>{

    return this.restangular.all('bank/registerAccount').post(accountDetails);
  }

  getRecord(accountNumber: number): Observable<any>{

    return this.restangular.one('bank/getRecord').get({'account': accountNumber});
  }

  accreditAccount(credit): Observable<any> {

    return this.restangular.one('bank/accreditAccount').customPUT(credit);
  }
}

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

  getAccountStatus(accountDetails: any): Observable<any>{

    return this.restangular.one('client/getRecord').get({'account': accountDetails.account, 'password': accountDetails.password});
  }

  confirmAccount(account_number: number): Observable<boolean>{

    return this.restangular.one('bank/getAccountByNumber')
      .get({'account_number': account_number})
      .map((results) => {

        if (results.account_number) return true;
        return false;
      });
  }

  accreditAccount(credit): Observable<any> {

    return this.restangular.one('bank/accreditAccount').customPUT(credit);
  }
}

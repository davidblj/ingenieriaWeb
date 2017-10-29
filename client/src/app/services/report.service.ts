import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ReportService {

  constructor(private restangular: Restangular) { }

  getReports(token: string): Observable<Object[]> {

    return this.restangular.one('vendor/getReports').get({}, {'x-access-token': token})
  }
}

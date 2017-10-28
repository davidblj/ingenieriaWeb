import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ReportService {

  constructor(private restangular: Restangular) { }

  getReports(): Observable<Object[]> {

    return this.restangular.all('vendor/getReports').getList();
  }
}

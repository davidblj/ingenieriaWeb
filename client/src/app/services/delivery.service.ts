import { Injectable } from '@angular/core';
import { Restangular } from "ngx-restangular";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DeliveryService {

  constructor(private restangular: Restangular) { }

  getDeliveries(): Observable<any> {

    let user = JSON.parse(localStorage.getItem('currentUser'));
    let token = user.token;
    return this.restangular.one('client/getDelivery').get({}, {'x-access-token': token});
  }

  processDelivery(response: boolean, id: string): Observable<any> {

     let requestContent = {
       content: {
         deliveryResponse: response,
         deliveryId: id
       },
       user: JSON.parse(localStorage.getItem('currentUser'))
     };

     return this.restangular.all('client/processDelivery').post(requestContent);
  }
}

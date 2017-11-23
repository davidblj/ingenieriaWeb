import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  cart:any;

  constructor() { }

  public getScope(): any{
    return this.cart;
  }

  public setScope(scope: any): void {
    this.cart = scope;
  }

}

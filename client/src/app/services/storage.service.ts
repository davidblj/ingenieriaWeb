import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  cart:any;
  price: number;

  constructor() { }

  public getScope(): any {
    return this.cart;
  }

  public getPrice(): number {
    return this.price;
  }

  public setScope(scope: any, price: number): void {
    this.price = price;
    this.cart = scope;
  }

}

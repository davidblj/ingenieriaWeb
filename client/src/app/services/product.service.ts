import { Injectable } from '@angular/core';
import { Restangular } from "ngx-restangular"
import { Observable } from "rxjs/Observable";
import { Product} from "../models/product";

@Injectable()
export class ProductService {

  constructor(private  restangurlar: Restangular) { }

   getProducts (): Observable<Product[]>{

    return this.restangurlar.all('shop/listProducts').getList();

   }
}

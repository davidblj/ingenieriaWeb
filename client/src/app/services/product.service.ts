import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import { Product} from '../models/product';

@Injectable()
export class ProductService {

  constructor(private  restangular: Restangular) { }

   getProducts(): Observable<Object[]>{

    return this.restangular.all('shop/listProducts').getList();
   }

   saveProduct(product: Product): Observable<string>{

    return this.restangular.all('shop/addProduct').post(product);
   }

   getProductsByVendor(token: string): Observable<Object[]>{

    return this.restangular.all('shop/listProductsByVendor').getList({}, {'x-access-token': token})
   }
}

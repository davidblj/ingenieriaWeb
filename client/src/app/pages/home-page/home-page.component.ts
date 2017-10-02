import { Component, OnInit } from '@angular/core';
import  { ProductService } from "../../services/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  products: Product[];
  errMess:String;

  constructor( private  productService: ProductService) { }

  ngOnInit() {

    this.productService.getProducts()
      .subscribe(
        products  => {
          this.products = products;
          console.log(products);

        },
        errmess => {
          this.errMess = errmess;
        }
      )
  }

}

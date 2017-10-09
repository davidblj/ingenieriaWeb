import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";

// modelos

import { Product } from "../../models/product";
import { Cart } from "../../models/cart";

// servicios

import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  products: Product[];
  itemsInCart = 0;
  errMess:String;

  constructor( private  productService: ProductService,
               private cartService: CartService) { }

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

  // todo: check if the user is logged in

  // todo: check for an existing cart-list and update the visual que (itemsInCart)

  // send a post request (with a fixed client id, but a real product id)
  public addToCart(productId: string) {

    let userId = '59daccd6ae04e14645ef3dd9';
    let cart = new Cart(userId, productId);

    // todo: HANDLE repeated products

    this.cartService.saveToCart(cart).subscribe(
      message => {

        this.itemsInCart ++;
        console.log(message, this.itemsInCart);
      },
      errmess => {

        // todo: set a proper response. In a modal, maybe.
        console.log('Sorry, something went wrong: ', errmess);
      }
    );
  }

  // todo: set a different use case if the user is not logged in
}

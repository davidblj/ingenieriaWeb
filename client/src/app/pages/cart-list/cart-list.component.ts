import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  cartProducts;
  batch;
  priceByVendor = [];
  subtotalPrice = 0;
  totalPrice = 0;
  discount = 0;
  shipping = 15000;

  constructor(private cartService: CartService) { }

  ngOnInit() {

    const user = localStorage.getItem('currentUser');
    const token = JSON.parse(user).token;

    this.cartService.returnCartProducts(token).subscribe(

      (cartProducts) => {

        this.cartProducts = cartProducts;
        this.batch = cartProducts.batch;
        this.getPriceByVendor(this.batch);
      }
    )
  }

  public getPriceByVendor(vendorBatch) {

    vendorBatch.forEach((vendor, index) => {

      let vendorPrice = 0;

      vendor.products.forEach((product) => {
        vendorPrice += product.price;
      });

      this.subtotalPrice += vendorPrice;

      if(vendor.hasCoupon) {
        this.getDiscount(vendorPrice);
        vendorPrice = +(vendorPrice * (9/10)).toFixed(2) ;
      }

      this.priceByVendor[index] = vendorPrice;
    });

    this.getTotalPrice();
    console.log(this.priceByVendor);
  }


  public getTotalPrice() {

    this.priceByVendor.forEach((vendorPrice) => {

      this.totalPrice += vendorPrice;
      console.log(this.totalPrice);
    });

    this.totalPrice += this.shipping;
  }


  public getDiscount(vendorPrice) {
    this.discount += +(vendorPrice * (1/10)).toFixed(2)
  }


  public onCheckboxClicked() {

    if(this.shipping === 15000) {
      this.totalPrice -= this.shipping;
      this.shipping = 0;
    } else {
      this.shipping = 15000;
      this.totalPrice += this.shipping;
    }
  }
}

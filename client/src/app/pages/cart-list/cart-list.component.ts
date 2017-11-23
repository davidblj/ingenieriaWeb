import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// services

import { CartService } from '../../services/cart.service';
import { CartList } from '../../models/cart-list';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  cartProducts;
  batch;
  priceByVendor = [];

  // coupon reactivity logic
  vendorsName = [];
  vendorsIds = [];
  vendorsCoupon = [];
  done = false;

  // cart pricing details
  subtotalPrice;
  totalPrice;
  discount;
  shipping = 0;

  constructor(private cartService: CartService,
              private location: Location,
              private modalService: NgbModal,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit() {

    const user = localStorage.getItem('currentUser');
    const token = JSON.parse(user).token;

    this.cartService.returnCartProducts(token).subscribe(

      (cartProducts) => {

        this.cartProducts = cartProducts;
        this.batch = cartProducts.batch;
        this.batch['delivery'] = true;
        this.getPriceByVendor(this.batch);
      }
    )
  }


  public getPriceByVendor(vendorBatch) {

    this.subtotalPrice = 0;
    this.totalPrice = 0;
    this.discount = 0;

    vendorBatch.forEach((vendor, index) => {

      let vendorPrice = 0;

      vendor.products.forEach((product) => {
        vendorPrice += product.price;
      });

      this.subtotalPrice += vendorPrice;

      if(vendor.hasCoupon) {
        this.getDiscount(vendorPrice);
        vendorPrice = +(vendorPrice * (9/10)).toFixed(2) ;

        if(!this.done) {
          this.vendorsName.push(vendor.vendorName);
          this.vendorsIds.push(vendor.id_vendor);
          this.vendorsCoupon.push(true);
        }
      }

      this.priceByVendor[index] = vendorPrice;
    });

    this.getTotalPrice();
    this.done = true;
    console.log(this.vendorsName);
    console.log(this.priceByVendor);
  }


  public getTotalPrice() {

    this.priceByVendor.forEach((vendorPrice) => {

      this.totalPrice += vendorPrice;
      console.log(this.totalPrice);
    });

    this.getDeliveryPrice();
    this.totalPrice += this.shipping;
  }


  public getDiscount(vendorPrice) {
    this.discount += +(vendorPrice * (1/10)).toFixed(2)
  }


  public onCheckboxClicked() {

    if(this.shipping !== 0) {
      this.totalPrice -= this.shipping;
      this.shipping = 0;
      this.batch['delivery'] = false;
    } else {
      // this.shipping = 15000;
      this.getDeliveryPrice();
      this.totalPrice += this.shipping;
      this.batch['delivery'] = true;
    }
  }

  getDeliveryPrice() {

    if (this.totalPrice*0.05 > 5000) {
      this.shipping = this.totalPrice*0.05
    } else {
      this.shipping = 5000;
    }
  };

  public onCouponClicked(id_vendor: string, index: number) {

    this.vendorsCoupon[index] = !this.vendorsCoupon[index];    // para estilos

    this.batch.forEach((vendor,vendorIndex) => {

      if(vendor.id_vendor === id_vendor) {
        this.batch[vendorIndex].hasCoupon = !this.batch[vendorIndex].hasCoupon;
      }
    });

    this.getPriceByVendor(this.batch);
    console.log(this.batch);
  }


  public goBack() {
    this.location.back();
  }


  public buyProducts(content) {

    // let cart = JSON.stringify(this.batch);
    if(this.shipping === 0) {

      let cart = new CartList(this.batch);
      this.cartService.buyProducts(cart).subscribe(
        (response) => {

          // todo: close modal when clicked outside the modal
          console.log(response);
          this.modalService.open(content);
        }
      );
    } else {
      this.storageService.setScope(this.batch, this.totalPrice);
      this.router.navigate(['/delivery-list']);
    }
  }
}

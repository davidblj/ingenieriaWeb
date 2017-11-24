import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CartService } from '../../services/cart.service';
import { FormBuilder } from '@angular/forms';
import { CartList } from '../../models/cart-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  credentialsForm;
  batch;
  price;
  error = false;

  constructor(private storageService: StorageService,
              private cartService: CartService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    console.log(this.storageService.getScope());
    this.batch = this.storageService.getScope();
    this.price = this.storageService.getPrice();
  }

  public createForm() {

    this.credentialsForm = this.formBuilder.group({
      account_number: '1018113427',
      password: 'isabel'
    });
  }

  onSubmit() {

    let credentials = this.credentialsForm.value;
    let cart = new CartList(this.batch, credentials);

    console.log(cart);
    this.cartService.buyProducts(cart).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/home']);
      },
      () => {
        this.error = true;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CartService } from '../../services/cart.service';
import { FormBuilder } from '@angular/forms';
import { CartList } from '../../models/cart-list';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  credentialsForm;
  batch;
  price;
  error = false;

  constructor(private storageService: StorageService,
              private cartService: CartService,
              private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    console.log(this.storageService.getScope());
    this.batch = this.storageService.getScope();
    this.price = this.storageService.getPrice();
  }

  public createForm() {

    this.credentialsForm = this.formBuilder.group({
      account_number: '',
      password: ''
    });
  }

  onSubmit() {

    let credentials = this.credentialsForm.value;
    let cart = new CartList(this.batch, credentials);

    console.log(cart);
    this.cartService.buyProducts(cart).subscribe(
      (response) => {

        // todo: close modal when clicked outside the modal
        console.log(response);
      },
      () => {
        this.error = true;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

// models

import { Product } from "../../../models/product";

// services

import { ProductService } from "../../../services/product.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  productData: Product;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router) {

    this.createForm();
  }

  ngOnInit() {
  }

  // todo: make all fields required
  createForm() {
    this.productForm = this.formBuilder.group({
      name: '',
      description: '',
      price: '',
      quantity: ''
    });

    // todo: validate changes
  }

  onSubmit() {
    this.productData = new Product(this.productForm.value);

    this.productService.saveProduct(this.productData).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (errmess) => {

        // todo: set a proper error message
        console.log(errmess);
      }
    )
  }
}

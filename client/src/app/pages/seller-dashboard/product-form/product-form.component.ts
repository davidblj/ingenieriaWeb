import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Product } from "../../../models/product";
import { ProductService } from "../../../services/product.service";
import { Router } from "@angular/router";

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

  createForm() {
    this.productForm = this.formBuilder.group({
      name: 'reloj',
      description: 'caro',
      quantity: 0,
      sku: 'unico'
    });

    // todo: validate changes
  }

  onSubmit() {
    this.productData = this.productForm.value;

    this.productService.saveProduct(this.productData).subscribe(
      () => {
        this.router.navigate(['home']);
      },
      (errmess) => {

        // todo: set a proper error message
        console.log(errmess);
      }
    )
  }
}

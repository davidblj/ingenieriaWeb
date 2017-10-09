import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RestangularModule } from 'ngx-restangular';
import {ReactiveFormsModule} from "@angular/forms";

// componentes

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AppRoutingModule} from "./app-routing/app-routing.module";
import { CartListComponent } from './pages/cart-list/cart-list.component';

// librerias

import {RestangularConfigFactory} from "./shared/restConfig";

// servicios

import { ProductService } from "./services/product.service";
import { ProductFormComponent } from './pages/seller-dashboard/product-form/product-form.component';
import { CartService } from "./services/cart.service";
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductFormComponent,
    CartListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

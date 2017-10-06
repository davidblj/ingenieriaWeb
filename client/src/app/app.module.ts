import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RestangularModule } from 'ngx-restangular';
import {ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";

// librerias

import {RestangularConfigFactory} from "./shared/restConfig";

// servicios

import { ProductService } from "./services/product.service";
import { ProductFormComponent } from './pages/seller-dashboard/product-form/product-form.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    ReactiveFormsModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

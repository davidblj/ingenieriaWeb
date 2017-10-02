import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RestangularModule } from 'ngx-restangular';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";

// librerias

import {RestangularConfigFactory} from "./shared/restConfig";

// servicios

import { ProductService } from "./services/product.service";


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

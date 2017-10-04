import {Routes } from "@angular/router";
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {ProductFormComponent} from "../pages/seller-dashboard/product-form/product-form.component";

export const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'new', component: ProductFormComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

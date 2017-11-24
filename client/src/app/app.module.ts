import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RestangularModule } from 'ngx-restangular';
import { ReactiveFormsModule} from "@angular/forms";

// componentes

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AppRoutingModule} from "./app-routing/app-routing.module";
import { CartListComponent } from './pages/cart-list/cart-list.component';
import { LoginComponent } from './pages/login/login.component';
import { WorkstationComponent } from './pages/seller-dashboard/workstation/workstation.component';
import { InventoryComponent } from './pages/seller-dashboard/inventory/inventory.component';
import { CouponsComponent} from './pages/seller-dashboard/coupons/coupons.component';
import { VendorAuthGuard} from './app-routing/guards/vendor.guard';
import { ClientAuthGuard} from './app-routing/guards/cart.guard';

// todo: place this in a new module !
import { DashboardComponent } from './pages/admin/admin-dashboard/dashboard/dashboard.component';
import { AccountRegistrationComponent } from './pages/admin/admin-dashboard/account-registration/account-registration.component';
import { UserManagementComponent } from './pages/admin/admin-dashboard/user-management/user-management.component';
import { AdminLoginComponent } from './pages/admin/admin-dashboard/admin-login/admin-login.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DeliveryListComponent } from './pages/delivery-list/delivery-list.component';

// librerias

import {RestangularConfigFactory} from './shared/restConfig';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

// servicios

import { ProductService } from './services/product.service';
import { ProductFormComponent } from './pages/seller-dashboard/product-form/product-form.component';
import { CartService } from './services/cart.service';
import { LoginService } from './services/login.service';
import { CouponService } from './services/coupon.service';
import { ReportsComponent } from './pages/seller-dashboard/reports/reports.component';
import { ReportService } from './services/report.service';
import { AccountService } from './bank-services/account.service';
import { TransactionsRecordComponent } from './pages/admin/transactions-record/transactions-record.component';
import { StorageService} from './services/storage.service';
import { DeliveryService} from './services/delivery.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductFormComponent,
    CartListComponent,
    LoginComponent,
    WorkstationComponent,
    InventoryComponent,
    CouponsComponent,
    ReportsComponent,
    DashboardComponent,
    AccountRegistrationComponent,
    UserManagementComponent,
    AdminLoginComponent,
    TransactionsRecordComponent,
    CheckoutComponent,
    DeliveryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    ProductService,
    CartService,
    LoginService,
    CouponService,
    AccountService,
    VendorAuthGuard,
    ReportService,
    StorageService,
    DeliveryService,
    ClientAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

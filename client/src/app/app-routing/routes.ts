import {Routes } from '@angular/router';
import {HomePageComponent} from '../pages/home-page/home-page.component';
import {ProductFormComponent} from '../pages/seller-dashboard/product-form/product-form.component';
import {CartListComponent} from '../pages/cart-list/cart-list.component';
import {LoginComponent} from '../pages/login/login.component';
import {WorkstationComponent} from '../pages/seller-dashboard/workstation/workstation.component';
import {InventoryComponent} from '../pages/seller-dashboard/inventory/inventory.component';
import {CouponsComponent} from '../pages/seller-dashboard/coupons/coupons.component';
import {VendorAuthGuard} from './guards/vendor.guard';
import {ClientAuthGuard} from './guards/cart.guard';
import {ReportsComponent} from '../pages/seller-dashboard/reports/reports.component';
import {DashboardComponent} from '../pages/admin/admin-dashboard/dashboard/dashboard.component';
import {AccountRegistrationComponent} from '../pages/admin/admin-dashboard/account-registration/account-registration.component';
import {UserManagementComponent} from '../pages/admin/admin-dashboard/user-management/user-management.component';
import {AdminLoginComponent} from '../pages/admin/admin-dashboard/admin-login/admin-login.component';
import {TransactionsRecordComponent} from '../pages/admin/transactions-record/transactions-record.component';
import { CheckoutComponent } from '../pages/checkout/checkout.component';
import { DeliveryListComponent } from '../pages/delivery-list/delivery-list.component';
import { AdminAuthGuard } from './guards/admin.guard';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';

export const routes: Routes = [

  // todo: fake a new page or a new module
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'transactions-record', component: TransactionsRecordComponent},
  {path: 'bank', component: DashboardComponent, canActivate: [AdminAuthGuard],
    children: [
      {
        path: '', redirectTo: 'account-registration', pathMatch: 'full'
      },
      {
        path: 'account-registration', component: AccountRegistrationComponent
      },
      {
        path: 'user-management', component: UserManagementComponent
      }
    ]
  },

  // todo: redirect a vendor to its dashboard whenever he access the homepage
  {path: 'home', component: HomePageComponent},
  {path: 'new', component: ProductFormComponent},
  {path: 'cart-list', component: CartListComponent, canActivate: [ClientAuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [ClientAuthGuard]},
  {path: 'delivery-list', component: DeliveryListComponent, canActivate: [ClientAuthGuard]},
  {path: 'dashboard', component: WorkstationComponent, canActivate: [VendorAuthGuard],
    children: [
      {
        path: '', redirectTo: 'inventory', pathMatch: 'full'
      },
      {
        path: 'inventory',
        component: InventoryComponent
      },
      {
        path: 'coupons',
        component: CouponsComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      }
    ]
  },
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditBillComponent } from './pages/edit-bill/edit-bill.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { EditCustomerComponent } from './pages/edit-customer/edit-customer.component';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ListBillComponent } from './pages/list-bill/list-bill.component';
import { ListCategoryComponent } from './pages/list-category/list-category.component';
import { ListCustomerComponent } from './pages/list-customer/list-customer.component';
import { ListOrderComponent } from './pages/list-order/list-order.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'categories',
    component: ListCategoryComponent,
  },
  {
    path: 'category/:id',
    component: EditCategoryComponent,
  },
  {
    path: 'products',
    component: ListProductComponent,
  },
  {
    path: 'product/:id',
    component: EditProductComponent,
  },
  {
    path: 'customers',
    component: ListCustomerComponent,
  },
  {
    path: 'customer/:id',
    component: EditCustomerComponent,
  },
  {
    path: 'orders',
    component: ListOrderComponent,
  },
  {
    path: 'order/:id',
    component: EditOrderComponent,
  },
  {
    path: 'bills',
    component: ListBillComponent,
  },
  {
    path: 'bill/:id',
    component: EditBillComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: '**',
    component: DashboardComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

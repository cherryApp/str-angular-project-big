import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { EditCustomerComponent } from './page/edit/edit-customer/edit-customer.component';
import { EditOrderComponent } from './page/edit/edit-order/edit-order.component';
import { EditProductComponent } from './page/edit/edit-product/edit-product.component';
import { ListingCustomerComponent } from './page/listing/listing-customer/listing-customer.component';
import { ListingOrderComponent } from './page/listing/listing-order/listing-order.component';
import { ListingProductComponent } from './page/listing/listing-product/listing-product.component';
// import { ListingBillComponent } from './page/listing/listing-bill/listing-bill.component';
// import { EditBillComponent } from './page/edit/edit-bill/edit-bill.component';
import { NotfoundComponent } from './page/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'products',
    component: ListingProductComponent
  },
  {
    path: 'products/:id',
    component: EditProductComponent
  },
  {
    path: 'orders',
    component: ListingOrderComponent
  },
  {
    path: 'orders/:id',
    component: EditOrderComponent
  },
  {
    path: 'customers',
    component: ListingCustomerComponent
  },
  {
    path: 'customers/:id',
    component: EditCustomerComponent
  },
  // {
  //   path: 'bills',
  //   component: ListingBillComponent
  // },
  // {
  //   path: 'bills/:id',
  //   component: EditBillComponent
  // },
  {
    path: '**',
    component: NotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

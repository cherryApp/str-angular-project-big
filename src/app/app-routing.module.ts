import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { EditOrderComponent } from './page/edit/edit-order/edit-order.component';
import { ListingOrderComponent } from './page/listing/listing-order/listing-order.component';
import { ListingProductComponent } from './page/listing/listing-product/listing-product.component';
import { NotfoundComponent } from './page/notfound/notfound.component';
// import { ListingCustomerComponent } from './page/listing/listing-customer/listing-customer.component';
// import { ListingBillComponent } from './page/listing/listing-bill/listing-bill.component';

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
    path: 'orders',
    component: ListingOrderComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'order/:id',
    component: EditOrderComponent
  },
  // {
  //   path: 'customers',
  //   component: ListingCustomerComponent
  // },
  // {
  //   path: 'bills',
  //   component: ListingBillComponent
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { EditOrderComponent } from './page/edit/edit-order/edit-order.component';
import { ListingOrderComponent } from './page/listing/listing-order/listing-order.component';
import { ListingProductComponent } from './page/listing/listing-product/listing-product.component';
// import { ListingCustomerComponent } from './page/listing/listing-customer/listing-customer.component';
// import { ListingBillComponent } from './page/listing/listing-bill/listing-bill.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'products', component: ListingProductComponent },
  { path: 'orders', component: ListingOrderComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/:id', component: EditOrderComponent },
  // { path: 'customers', component: ListingCustomerComponent },
  // { path: 'bills', component: ListingBillComponent },
  { path: '**', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

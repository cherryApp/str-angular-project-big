import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterPipe } from './pipe/filter.pipe';
import { SorterPipe } from './pipe/sorter.pipe';
import { OrderComponent } from './order/order.component';
import { EditProductComponent } from './page/edit/edit-product/edit-product.component';
import { EditCustomerComponent } from './page/edit/edit-customer/edit-customer.component';
import { ListingProductComponent } from './page/listing/listing-product/listing-product.component';
import { ListingOrderComponent } from './page/listing/listing-order/listing-order.component';
import { EditOrderComponent } from './page/edit/edit-order/edit-order.component';
import { NavComponent } from './nav/nav/nav.component';
import { CardComponent } from './page/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    SorterPipe,
    OrderComponent,
    EditProductComponent,
    EditCustomerComponent,
    ListingProductComponent,
    ListingOrderComponent,
    EditOrderComponent,
    NavComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

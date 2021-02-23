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
import { EditCustomerComponent } from './page/edit/edit-customer/edit-customer.component';
<<<<<<< HEAD
import { ProductListComponent } from './page/product/product-list/product-list.component';
import { ListProductComponent } from './page/list/list-product/list-product.component';
import { ListingProductComponent } from './page/listing/listing-product/listing-product.component';
=======
import { ListingOrderComponent } from './page/listing/listing-order/listing-order.component';
>>>>>>> origin/dev

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    SorterPipe,
    OrderComponent,
    EditCustomerComponent,
<<<<<<< HEAD
    ProductListComponent,
    ListProductComponent,
    ListingProductComponent
=======
    ListingOrderComponent,
>>>>>>> origin/dev
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

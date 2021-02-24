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
import { ListingCustomerComponent } from './page/listing/listing-customer/listing-customer.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { NotfoundComponent } from './page/notfound/notfound.component';
import { SidebarComponent } from './widget/sidebar/sidebar.component';
import { ChartComponent } from './widget/chart/chart.component';
import { ListComponent } from './widget/list/list.component';

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
    ListingCustomerComponent,
    DashboardComponent,
    NotfoundComponent,
    SidebarComponent,
    ChartComponent,
    ListComponent,
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
export class AppModule { }

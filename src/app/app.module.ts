import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { FooterComponent } from './common/footer/footer.component';
import { BillService } from './service/bill.service';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { InfoCardComponent } from './common/info-card/info-card.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { BillListComponent } from './page/bill-list/bill-list.component';
import { EditOrderComponent } from './page/edit-order/edit-order.component';
import { CustomerListComponent } from './page/customer-list/customer-list.component';
import { OrderModule } from 'ngx-order-pipe';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    FooterComponent,
    OrderListComponent,
    ProductListComponent,
    InfoCardComponent,
    EditProductComponent,
    EditCustomerComponent,
    EditOrderComponent,
    BillListComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    FormsModule,
    OrderModule,
  ],
  providers: [
    BillService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

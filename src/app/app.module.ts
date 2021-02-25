import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListCategoryComponent } from './pages/list-category/list-category.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ListCustomerComponent } from './pages/list-customer/list-customer.component';
import { EditCustomerComponent } from './pages/edit-customer/edit-customer.component';
import { ListOrderComponent } from './pages/list-order/list-order.component';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';
import { ListBillComponent } from './pages/list-bill/list-bill.component';
import { EditBillComponent } from './pages/edit-bill/edit-bill.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { FooterComponent } from './common/footer/footer.component';
import { FilterPipe } from './pipe/filter.pipe';
import { InfoCardComponent } from './common/info-card/info-card.component';
import { SorterPipe } from './pipe/sorter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListCategoryComponent,
    EditCategoryComponent,
    ListProductComponent,
    EditProductComponent,
    ListCustomerComponent,
    EditCustomerComponent,
    ListOrderComponent,
    EditOrderComponent,
    ListBillComponent,
    EditBillComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    FilterPipe,
    InfoCardComponent,
    SorterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

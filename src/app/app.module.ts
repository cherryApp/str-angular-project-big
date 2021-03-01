import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { FilterPipe } from './pipe/filter.pipe';
import { SorterPipe } from './pipe/sorter.pipe';
import { BillListComponent } from './pages/bill-list/bill-list.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { InfoCardComponent } from './common/info-card/info-card.component';
import { ChartComponent } from './common/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { EditProductComponent } from './editors/edit-product/edit-product.component';
import { EditCustomerComponent } from './editors/edit-customer/edit-customer.component';
import { CategroyListComponent } from './pages/categroy-list/categroy-list.component';
import { EditCategoryComponent } from './editors/edit-category/edit-category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditBillComponent } from './editors/edit-bill/edit-bill.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      enableHtml: true
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ChartsModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ProductListComponent,
    OrderListComponent,
    FilterPipe,
    SorterPipe,
    BillListComponent,
    CustomerListComponent,
    DashboardComponent,
    InfoCardComponent,
    ChartComponent,
    EditProductComponent,
    CategroyListComponent,
    EditCategoryComponent,
    AboutUsComponent,
    EditBillComponent,
    //EditCustomerComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

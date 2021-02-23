import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillListComponent } from './pages/bill-list/bill-list.component';
import { ListBillComponent } from './pages/list-bill/list-bill.component';

@NgModule({
  declarations: [
    AppComponent,
    BillListComponent,
    ListBillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

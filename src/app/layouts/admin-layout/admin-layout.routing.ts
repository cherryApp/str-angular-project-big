import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ProductListComponent } from 'app/pages/product-list/product-list.component';
import { OrderListComponent } from 'app/pages/order-list/order-list.component';
import { BillListComponent } from 'app/pages/bill-list/bill-list.component';
import { CustomerListComponent } from 'app/pages/customer-list/customer-list.component';
import { EditCustomerComponent } from 'app/editors/edit-customer/edit-customer.component';
<<<<<<< HEAD
import { EditOrderComponent } from 'app/editors/edit-order/edit-order.component';
import { EditCategoryComponent } from 'app/editors/edit-category/edit-category.component';
import { CategroyListComponent } from 'app/pages/categroy-list/categroy-list.component';
=======
import { CategroyListComponent } from 'app/pages/categroy-list/categroy-list.component';
import { EditCategoryComponent } from 'app/editors/edit-category/edit-category.component';
>>>>>>> dev

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'product-list', component: ProductListComponent },
    { path: 'order-list', component: OrderListComponent },
    { path: 'bill-list', component: BillListComponent },
    { path: 'customer-list', component: CustomerListComponent },
    { path: 'customer/:id', component: EditCustomerComponent },
    { path: 'order/:id', component: EditOrderComponent },
    { path: 'category-list', component: CategroyListComponent},
    { path: 'category/:id', component: EditCategoryComponent},
];

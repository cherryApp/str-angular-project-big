import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  hidden: boolean;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '', hidden: false },
  // { path: '/user-profile', title: 'User Profile', icon: 'person', class: '', hidden: false },
  { path: '/product-list', title: 'Products', icon: 'shopping_cart', class: '', hidden: false },
  { path: '/customer-list', title: 'Customers', icon: 'account_circle', class: '', hidden: false },
  { path: '/order-list', title: 'Orders', icon: 'content_paste', class: '', hidden: false },
  { path: '/bill-list', title: 'Bills', icon: 'euro_symbol', class: '', hidden: false },

  { path: '/customer/', title: 'Customer', icon: '', class: '', hidden: true },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => !menuItem.hidden);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}

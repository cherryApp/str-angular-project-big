import { Component, OnInit } from '@angular/core';
import { InfoCard } from '../card/card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cards: InfoCard[] = [
    {
      cardClass: 'card-header-warning',
      icon: 'store',
      title: '117',
      content: 'Customers',
      footer: 'footer text',
      footIcon: 'text-danger',
    },
    {
      cardClass: 'card-header-success',
      icon: 'info_outline',
      title: '533',
      content: 'Products',
      footer: 'footer text',
      footIcon: 'text-danger',
    },
    {
      cardClass: 'card-header-danger',
      icon: 'content_copy',
      title: '729',
      content: 'Orders',
      footer: 'footer text',
      footIcon: 'text-danger',
    },
    {
      cardClass: 'card-header-warning',
      icon: 'update',
      title: '544',
      content: 'Cash-desk',
      footer: 'footer text',
      footIcon: 'text-danger',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

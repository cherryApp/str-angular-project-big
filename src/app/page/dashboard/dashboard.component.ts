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
      title: 'Customers',
      content: '117',
      footer: 'footer text',
      footIcon: 'text-danger',
    },
    {
      cardClass: 'card-header-success',
      icon: 'info_outline',
      title: 'Products',
      content: '533',
      footer: 'footer text',
      footIcon: 'text-danger',
    },
    {
      cardClass: 'card-header-danger',
      icon: 'content_copy',
      title: '3. card',
      content: 'content',
      footer: 'footer text',
      footIcon: 'text-danger',
    },
    {
      cardClass: 'card-header-warning',
      icon: 'update',
      title: '4. card',
      content: 'content',
      footer: 'footer text',
      footIcon: 'text-danger',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

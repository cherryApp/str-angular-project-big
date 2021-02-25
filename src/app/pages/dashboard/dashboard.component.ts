import { Component, OnInit } from '@angular/core';
import { InfoCard } from 'src/app/common/info-card/info-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cards: InfoCard[] = [
    {
      icon:'directions_car_filled',
      cardClass:'card-header-success',
      title:'Products',
      content: 'This is our Products.',
      footer: 'Lorem ipsum dolor sit amet.',
    },
    {
      icon:'person',
      cardClass:'card-header-danger',
      title:'Customers',
      content: 'This is our Customers.',
      footer: 'Lorem ipsum dolor sit amet.',
    },
    {
      icon:'shopping_cart',
      cardClass:'card-header-info',
      title:'Orders',
      content: 'This is our Customer Orders.',
      footer: 'Lorem ipsum dolor sit amet.',
    },
    {
      icon:'receipt',
      cardClass:'card-header-warning',
      title:'Bills',
      content: 'This is our Order Bills.',
      footer: 'Lorem ipsum dolor sit amet.',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

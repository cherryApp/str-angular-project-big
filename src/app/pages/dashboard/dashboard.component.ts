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
      icon:'content_copy',
      cardClass:'card-header-warning',
      title:'1.card',
      content: 'dd',
      footer: 'ee',
    },
    {
      icon:'store',
      cardClass:'card-header-success',
      title:'',
      content: '',
      footer: '',
    },
    {
      icon:'info_outline',
      cardClass:'card-header-danger',
      title:'',
      content: '',
      footer: '',
    },
    {
      icon:'update',
      cardClass:'card-header-info',
      title:'',
      content: '',
      footer: '',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

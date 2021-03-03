import { Component, OnInit } from '@angular/core';
import { IInfoCard } from 'src/app/common/info-card/info-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cards: IInfoCard[] = [
    {
      iconClass: 'material-icons',
      iconText: 'content_copy',
      cardClass: 'card-header-warning',
      title: 'Used space',
      content: '49/50 GB',
      footer: 'Ide is jön valami...',
    },
    {
      iconClass: 'material-icons',
      iconText: 'store',
      cardClass: 'card-header-success',
      title: 'Revenue',
      content: '$34,245',
      footer: 'Last 24 Hours',
    },
    {
      iconClass: 'material-icons',
      iconText: 'info_outline',
      cardClass: 'card-header-danger',
      title: 'info_outline',
      content: 'Fixed Issues: 75',
      footer: 'Tracked from Github',
    },
    {
      iconClass: 'fa fa-twitter',
      iconText: '',
      cardClass: 'card-header-info',
      title: 'Followers',
      content: '+245',
      footer: 'Just Updated',
    },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}

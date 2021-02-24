import { Component, Input, OnInit } from '@angular/core';

export interface InfoCard {
  icon: string;
  cardClass: string;
  title: string;
  content: string;
  footer: string;
}

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {

  @Input() icon: string = '';
  @Input() cardClass: string = 'card-header-warning';
  @Input() title: string = 'title';
  @Input() content: string = '';
  @Input() footer: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

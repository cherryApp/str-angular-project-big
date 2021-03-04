import { Component, Input, OnInit } from '@angular/core';

export interface IInfoCard {
  iconClass: string;
  iconText: string;
  cardClass: string;
  title: string;
  content: string;
  footer: string;
}

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  @Input() iconClass: string = '';
  @Input() iconText: string = '';
  @Input() cardClass: string = '';
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() footer: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

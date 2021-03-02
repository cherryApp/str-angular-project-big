import { Component, Input, OnInit } from '@angular/core';

export interface InfoCard {
  icon: string;
  cardClass: string;
  content: string;
  title: string | null;
  footIcon: string;
  footer: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() icon: string = '';
  @Input() cardClass: string = 'card-header-warning';
  @Input() content: string = 'content';
  @Input() title: string | null = 'title';
  @Input() unit: string = '';
  @Input() footIcon: string = '';
  @Input() footer: string = '';

  constructor() {}

  ngOnInit(): void {}
}

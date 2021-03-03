import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inprogress',
  templateUrl: './inprogress.component.html',
  styleUrls: ['./inprogress.component.scss']
})
export class InprogressComponent implements OnInit {
  waiting = true;
  constructor() { }

  ngOnInit(): void {
  }

}

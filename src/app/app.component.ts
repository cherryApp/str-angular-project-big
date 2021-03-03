import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'str-angular-project-big';
  waiting = true;
  ngOnInit() {
    let time = (Math.floor(Math.random() * 2) + 1) * 1000;
    setTimeout(() => { this.waiting = false }, time);
  }
}

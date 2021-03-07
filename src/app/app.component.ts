import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'big-project-str';
  itemName: string = '';

  listItemName(item: string) {
    item ? this.itemName = item : null;
  }
}

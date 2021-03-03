import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'big-project-str';
  itemName = ' : Dashboard';

  listItemName(item: string) {
    this.itemName = item ? ` : ${item}` : ' : Dashboard';
  }
}

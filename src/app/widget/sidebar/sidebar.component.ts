import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  setActive(event: Event): void {
    const navItems = document.querySelectorAll('ul.nav li');
    const currentListItem = (event.currentTarget as HTMLElement);
    navItems.forEach(item => item.classList.remove('active'));
    currentListItem?.classList.add('active');
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() listItemName = new EventEmitter<string>();

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.setActiveItemOnInit();
  }

  setActiveItemOnInit(): void {
    const aTags = document.querySelectorAll("a.nav-link");
    let location = this.location.path();
    location === '' ? location = '/' : location;
    aTags.forEach(aTag => {
      const currentATagLink = aTag.getAttribute("routerLink");
      const liItem = aTag.parentElement;
      currentATagLink === location ? liItem?.classList.add('active') : liItem?.classList.remove('active');
    });
  }

  onClickListItem(event: Event): void {
    const navItems = document.querySelectorAll('ul.nav li.nav-item');
    const currentListItem = (event.currentTarget as HTMLElement);
    navItems.forEach(item => item.classList.remove('active'));
    currentListItem?.classList.add('active');
  }

  onClickListItemForOutput(listItemName: string): void {
    this.listItemName.emit(listItemName);
  }

  onClickLogo(): void {
    const navItems = document.querySelectorAll('ul.nav li.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    navItems[0].classList.add('active');
  }

}

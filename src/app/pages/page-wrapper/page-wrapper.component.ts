import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu, NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent implements OnInit {

  public currentMenuItem: Menu;
  public menuItems: Menu[];

  constructor(public navService: NavService, private router: Router) { }

  ngOnInit(): void {
    this.setMenuItems();
  }

  setMenuItems() {
    this.navService.items.subscribe(menuItems => {
      this.menuItems = menuItems;
      this.currentMenuItem = menuItems.find(item => item.path == this.router.url);
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.map(items => {
            if (items.path === event.url)
              this.setNavActive(items);
          })
        }
      })
    })
  }

  setNavActive(item) {
    this.currentMenuItem = this.menuItems.find(menuItem => menuItem == item);
  }
}

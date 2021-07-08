import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu, NavService } from 'src/app/shared/services/nav.service';
import { FCMService} from 'src/app/shared/services/fcm.service';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent implements OnInit {

  public currentMenuItem: Menu;
  public menuItems: Menu[];
  public message;
  constructor(public navService: NavService, private router: Router, public fcm: FCMService) { }

  ngOnInit(): void {
    this.setMenuItems();
    this.fcm.requestPerm()
    this.fcm.receiveMessage()
    this.message = this.fcm.currentMessage
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

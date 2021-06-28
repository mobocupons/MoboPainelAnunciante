
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NavService, Menu } from '../../services/nav.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menuItems: Menu[];
  public items: Menu[];
  public openNav: boolean = false
  public right_sidebar: boolean = false
  public text: string

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.setMenuItems()
  }

  setMenuItems() {
    this.navServices.getMenuItens();
    this.navServices.items.subscribe(menuItems => {
      
      this.menuItems = menuItems
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter(items => {
            if (items.path === event.url)
              this.setNavActive(items)
          })
        }
      })
    })
  }

  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      menuItem.active = menuItem == item
    })
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  getMenuIcon(menuItem) {
    return 'assets/images/icons/' + menuItem.icon + '.svg'
  }

  logout() {
    this.authService.logout();
  }

}

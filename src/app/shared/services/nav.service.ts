import { Injectable, HostListener } from "@angular/core";
import { BehaviorSubject, Observable, Subscriber } from "rxjs";

// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = true;

  constructor() {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }

  // Windows width
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  USER_MENUITEMS: Menu[] = [
    {
      path: "/dashboard/aplicativos",
      title: "Aplicativo",
      icon: "aplicativo",
      type: "link",
    },
    {
      path: "/dashboard/profissionais",
      title: "Profissionais",
      icon: "profissionais",
      type: "link",
    },
    {
      path: "/dashboard/usuarios",
      title: "Usuários",
      icon: "usuarios",
      type: "link",
    },
    {
      path: "logout",
      title: "Sair",
      icon: null,
      type: "out",
    },
  ];
  items = new BehaviorSubject<Menu[]>(this.USER_MENUITEMS);
}

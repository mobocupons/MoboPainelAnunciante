import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import {Anunciante} from '../models/anunciante.model'
import { CampanhaService } from './campanha.service';
import { AnuncianteService } from './anunciante.service';
import { Local } from '../models/local.model';
import { Constants } from '../utils/constants';

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
  providedIn: 'root',
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = true;
  USER_MENUITEMS: Menu[] = [
    {
      path: '/dashboard/coupons',
      title: 'Cupons',
      icon: 'fa-barcode',
      type: 'link',
    }];
  constructor(private localStorageService: LocalStorageService,
    private campanhaService: CampanhaService,
    private anuncianteService: AnuncianteService) {
    this.onResize();
    
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  getMenuItens(){
    let hasOrder = this.localStorageService.getItem(Constants.HASORDER)
    let hasOrderHistory = this.localStorageService.getItem(Constants.HASORDERHISTORY)
    this.USER_MENUITEMS = [
      {
        path: '/dashboard/coupons',
        title: 'Cupons',
        icon: 'fa-barcode',
        type: 'link',
      }]
    if(hasOrder == "true"){
        this.USER_MENUITEMS.push({
          path: '/dashboard/orders',
          title: 'Pedidos',
          icon: 'fa-bell',
          type: 'link',
        });
      }
    if(hasOrderHistory == "true"){
        this.USER_MENUITEMS.push({
          path: '/dashboard/orders-history',
          title: 'Histórico',
          icon: 'fa-history',
          type: 'link',
        });
    }
    this.USER_MENUITEMS.push({
      path: 'logout',
      title: 'Sair',
      icon: null,
      type: 'out',
    });
  }
  items = new BehaviorSubject<Menu[]>(this.USER_MENUITEMS);
}

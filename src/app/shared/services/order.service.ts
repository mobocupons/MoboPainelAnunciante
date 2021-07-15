import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BaseUrlTypeEnum } from '../utils/enums/base-url-type.enum';
import { PriceLevel } from '../domains/price-level.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = 'Pedido';

  constructor(private baseService: BaseService) { }

  getAll(localId): Observable<any[]> {
    let url = this.url+"/Local/"+localId;
    return this.baseService.get(url, BaseUrlTypeEnum.normal);
  }
  changeStatus(status, id): Observable<any[]> {
      let url = this.url+"/"+id+"/StatusPedido/"+status;
    return this.baseService.post(url, BaseUrlTypeEnum.normal);
  }
}
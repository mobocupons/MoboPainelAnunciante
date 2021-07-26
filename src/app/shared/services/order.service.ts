import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BaseUrlTypeEnum } from '../utils/enums/base-url-type.enum';
import { PriceLevel } from '../domains/price-level.interface';
import { Observable } from 'rxjs';
import {CompleteOrder} from "src/app/shared/models/complete-order.model"

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = 'Pedido';

  constructor(private baseService: BaseService) { }

  getAll(localId): Observable<CompleteOrder> {
    let url = this.url+"/Local/"+localId;
    return this.baseService.get(url, BaseUrlTypeEnum.normal);
  }
  getHistory(localId): Observable<CompleteOrder> {
    let url = this.url+"/Local/"+localId+"/ObterHistorico";
    return this.baseService.get(url, BaseUrlTypeEnum.normal);
  }
  changeStatus(pedidoStatusId, id): Observable<any[]> {
      let url = this.url+"/AtualizarStatusPedido";
      let body = {id,pedidoStatusId}
    return this.baseService.post(url,body, BaseUrlTypeEnum.normal);
  }
}
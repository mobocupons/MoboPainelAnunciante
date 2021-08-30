import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BaseUrlTypeEnum } from '../utils/enums/base-url-type.enum';
import { PriceLevel } from '../domains/price-level.interface';
import { Observable } from 'rxjs';
import {ValueCompleteOrder} from "src/app/shared/models/complete-order.model"

@Injectable({
  providedIn: 'root'
})
export class AnuncianteService {

  private url: string = 'Anunciante';

  constructor(private baseService: BaseService) { }

  getAnunciante(id): Observable<ValueCompleteOrder> {
    let url = this.url+"/"+id;
    return this.baseService.get(url, BaseUrlTypeEnum.normal);
  }
  changeStatus(status, id): Observable<any[]> {
      let url = this.url+"/"+id+"/StatusPedido/"+status;
    return this.baseService.post(url, BaseUrlTypeEnum.normal);
  }
}
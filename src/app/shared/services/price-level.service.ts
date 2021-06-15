import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BaseUrlTypeEnum } from '../utils/enums/base-url-type.enum';
import { PriceLevel } from '../domains/price-level.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceLevelService {

  private url: string = 'PriceLevel';

  constructor(private baseService: BaseService) { }

  getAll(): Observable<PriceLevel[]> {
    return this.baseService.get(this.url, BaseUrlTypeEnum.normal);
  }
}

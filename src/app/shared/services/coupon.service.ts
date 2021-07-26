import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { RequestModel } from '../models/request-model'
import { CycleOverview } from '../models/cycle-overview.model'
import { BaseUrlTypeEnum } from '../utils/enums/base-url-type.enum';
import { CardDataModel } from '../models/card-data.model';
import { Cycle } from '../domains/cycle.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CardTypeEnum } from '../utils/enums/card-type.enum';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private baseService: BaseService,
    private http: HttpClient) {

  }

  postValidateCoupon(anuncianteId, localId, codigos) {
      let filterModel = { anuncianteId,
                          localId,
                          codigos}
    return this.baseService.post(`Cupom/ValidarCupons`,filterModel, BaseUrlTypeEnum.normal);
  }
}
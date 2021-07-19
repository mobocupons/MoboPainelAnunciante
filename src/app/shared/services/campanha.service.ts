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
export class CampanhaService {

  constructor(private baseService: BaseService,
    private http: HttpClient) {

  }

  getCampanhasAtivasPorAnunciante(anuncianteId) {
    anuncianteId = 55
    let filterModel = {anuncianteId}
    return this.baseService.post(`Campanha/ObterCampanhasAtivasPorAnunciante`,filterModel, BaseUrlTypeEnum.normal);
  }
}
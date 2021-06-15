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
export class UserService {

  pocUrl = 'assets/data/cycle-overview-poc.json'

  constructor(private baseService: BaseService,
    private http: HttpClient) {

  }

  getAllFinalUsers() {
    return this.baseService.get(`User/final-users`, BaseUrlTypeEnum.normal);
  }

  getActiveInative(request: RequestModel): Observable<CardDataModel> {
    let urlRequest: string = this.getParams(request);
    return this.baseService.get(`users-active-inactive?${urlRequest}`);
  }

  getSessions(request: RequestModel): Observable<CardDataModel> {
    let urlRequest: string = this.getParams(request);
    return this.baseService.get(`sessions?${urlRequest}`);
  }


  getCycleDetails(request: RequestModel) {
    let urlRequest: string = `${this.getParams(request)}&cycleId=${request.cycleId}`.replace(/:/g, "%3A");
    return this.baseService.get(`cycle-detail?${urlRequest}`);
  }

  getCycleTime(request: RequestModel) {
    let urlRequest: string = `${this.getParams(request)}&cycleId=${request.cycleId}`.replace(/:/g, "%3A");
    return this.baseService.get(`cycle-time?${urlRequest}`);
  }

  getTrails(request: RequestModel) {
    let urlRequest: string = this.getParams(request);
    return this.baseService.get(`trail-detail?${urlRequest}`);
  }

  getUseContinuosCycle(request: RequestModel) {
    let urlRequest: string = `${this.getParams(request)}&ocurrence=${request.ocurrence}`.replace(/:/g, "%3A");
    return this.baseService.get(`continuous-cycle?${urlRequest}`);
  }

  getCyclesOverview(request: RequestModel) {
    let urlRequest: string = this.getParams(request);
    return this.baseService.get(`cycle-summary?${urlRequest}`);
  }

  getAssessements() {
    return this.baseService.get(`Assessment/filtered`, BaseUrlTypeEnum.normal);
  }

  getCycles(): Observable<Cycle[]> {
    return this.baseService.get(`Cycle/valid`, BaseUrlTypeEnum.normal);
  }

  sendAssessmentLink(assessmentId: string, link: string) {
    return this.baseService.put(`Assessment/set-url/${assessmentId}`, { url: link }, BaseUrlTypeEnum.normal);
  }

  getUnconfirmedEmail() {
    return this.baseService.get(`User/final-users-with-unconfirmed-email`, BaseUrlTypeEnum.normal);
  }

  resendEmail(email) {
    return this.baseService.post(`User/resend-confirmation-code/${email}`, {}, BaseUrlTypeEnum.normal);
  }

  private getParams(request) {
    if (request.chartRange == CardTypeEnum.Totais) {
      return `chartRange=${request.chartRange}`.replace(/:/g, "%3A");
    }
    return `startDate=${request.startDate}&endDate=${request.endDate}&chartRange=${request.chartRange}`.replace(/:/g, "%3A");
  }
}

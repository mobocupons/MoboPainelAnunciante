import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { RequestModel } from 'src/app/shared/models/request-model'
import { Observable } from 'rxjs';
import { CardDataModel } from 'src/app/shared/models/card-data.model';
import { OccupationArea } from 'src/app/shared/domains/occupation-area.interface';
import { BaseUrlTypeEnum } from '../utils/enums/base-url-type.enum';
import { ProfessionalModel } from 'src/app/shared/models/professional.model';
import { Professional } from 'src/app/shared/domains/professional.interface';
import { DowingTokenModel } from 'src/app/shared/models/dowing-token.model';
import { EvaluationStatusEnum } from '../utils/enums/evaluation-status.enum';
import { StripeInviteModel } from 'src/app/shared/models/stripe.invite.model';
import { UpdateStripeIdModel } from 'src/app/shared/models/update-stripeId-model';
import { CardTypeEnum } from '../utils/enums/card-type.enum';


@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  private url = 'Professional';

  constructor(private baseService: BaseService) { }

  get(professionalId: string): Observable<Professional> {
    return this.baseService.get(`${this.url}/${professionalId}`, BaseUrlTypeEnum.normal);
  }

  getAll(): Observable<ProfessionalModel[]> {
    return this.baseService.get(`${this.url}/professional-users`, BaseUrlTypeEnum.normal);
  }

  getActiveInative(request: RequestModel): Observable<CardDataModel> {
    let urlRequest: string = this.getParams(request)
    return this.baseService.get(`professionals-active-inactive?${urlRequest}`);
  }

  getSessions(request: RequestModel): Observable<CardDataModel> {
    let urlRequest: string = this.getParams(request)
    return this.baseService.get(`sessions?${urlRequest}`);
  }

  getOccupationArea(): Observable<OccupationArea[]> {
    return this.baseService.get(`OccupationArea/all`, BaseUrlTypeEnum.normal);
  }

  saveOccupationArea(occupationAreas: any): Observable<OccupationArea> {
    return this.baseService.post(`OccupationArea`, occupationAreas, BaseUrlTypeEnum.normal);
  }

  deleteOccupationArea(occupationArea: OccupationArea): any {
    return this.baseService.delete(`OccupationArea/${occupationArea.id}`, BaseUrlTypeEnum.normal);
  }


  getEvaluation(professionalId: string) {
    return this.baseService.get(`${this.url}/get-evaluation/${professionalId}`, BaseUrlTypeEnum.normal);
  }

  toApproveReject(ProfessionalId: string, priceLevels: any[], evaluationStatus: EvaluationStatusEnum) {
    let dowingToken: DowingTokenModel = new DowingTokenModel();
    dowingToken = JSON.parse(localStorage.getItem("dowing-token"));
    if (dowingToken) {
      let toApproveReject: any;
      toApproveReject = {
        professionalId: ProfessionalId,
        backofficeUserId: dowingToken.userId
      }
      return this.baseService.post(`${this.url}/${(evaluationStatus == EvaluationStatusEnum.Approved) ? 'approve' : 'reject'}`, toApproveReject, BaseUrlTypeEnum.normal);
    }
    return null;
  }

  saveStripeInvite(stripeInviteModel: StripeInviteModel) {
    return this.baseService.post(`${this.url}/send-stripe-invite`, stripeInviteModel, BaseUrlTypeEnum.normal);
  }

  updateStripeId(updateStripeIdModel: UpdateStripeIdModel) {
    return this.baseService.post(`${this.url}/update-stripe-id-and-price-levels`, updateStripeIdModel, BaseUrlTypeEnum.normal);
  }

  private getParams(request) {
    if (request.chartRange == CardTypeEnum.Totais) {
      return `chartRange=${request.chartRange}`.replace(/:/g, "%3A");
    }
    return `startDate=${request.startDate}&endDate=${request.endDate}&chartRange=${request.chartRange}`.replace(/:/g, "%3A");
  }
}

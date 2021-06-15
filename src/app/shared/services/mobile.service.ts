import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { RequestModel } from '../models/request-model'
import { BaseUrlTypeEnum } from 'src/app/shared/utils/enums/base-url-type.enum';
import { RatingStatusEnum } from 'src/app/shared/utils/enums/rating-status-enum'
import { CardTypeEnum } from '../utils/enums/card-type.enum';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private baseService: BaseService) {
  }

  getActiveInative(request: RequestModel) {
    let urlRequest: string = this.getParams(request);
    return this.baseService.get(`professionals-active-inactive?${urlRequest}`);
  }

  getDownloads(request: RequestModel) {
    let urlRequest: string = this.getParams(request);
    // TODO: ajustar a rota com o back, quando houver
    return this.baseService.get(`professionals-active-inactive?${urlRequest}`);
  }

  getAccounts(request: RequestModel) {
    let urlRequest: string = this.getParams(request);
    // TODO: ajustar a rota com o back, quando houver
    return this.baseService.get(`professionals-active-inactive?${urlRequest}`);
  }

  getInvoicing(request: RequestModel) {
    let urlRequest: string = this.getParams(request);
    // TODO: ajustar a rota com o back, quando houver
    return this.baseService.get(`professionals-active-inactive?${urlRequest}`);
  }

  getAllComments() {
    return this.baseService.get(`Professional/professional-ratings`, BaseUrlTypeEnum.normal);
  }

  getAllCommentsByStatus(rattingStatus: RatingStatusEnum) {
    return this.baseService.get(`Professional/professional-ratings?pendingFilter=${rattingStatus}`, BaseUrlTypeEnum.normal);
  }

  approveComment(commentId: string) {
    return this.baseService.post(`Rating/approve/${commentId}`, {}, BaseUrlTypeEnum.normal);
  }

  reproveComment(commentId: string) {
    return this.baseService.post(`Rating/reprove/${commentId}`, {}, BaseUrlTypeEnum.normal);
  }

  private getParams(request) {
    if (request.chartRange == CardTypeEnum.Totais) {
      return `chartRange=${request.chartRange}`.replace(/:/g, "%3A");
    }
    return `startDate=${request.startDate}&endDate=${request.endDate}&chartRange=${request.chartRange}`.replace(/:/g, "%3A");
  }
}

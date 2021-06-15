import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { BaseUrlTypeEnum } from '../../shared/utils/enums/base-url-type.enum'

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get(url: string, baseUrlType: BaseUrlTypeEnum = BaseUrlTypeEnum.InternalDashboard): Observable<any> {
    return this.http.get(`${this.getURL(baseUrlType)}/${url}`);
  }

  post(url: string, body: any, baseUrlType: BaseUrlTypeEnum = BaseUrlTypeEnum.InternalDashboard): Observable<any> {
    return this.http.post(`${this.getURL(baseUrlType)}/${url}`, body);
  }

  put(url: string, body: any, baseUrlType: BaseUrlTypeEnum = BaseUrlTypeEnum.InternalDashboard): Observable<any> {
    return this.http.put(`${this.getURL(baseUrlType)}/${url}`, body);
  }

  patch(url: string, body: any, baseUrlType: BaseUrlTypeEnum = BaseUrlTypeEnum.InternalDashboard): Observable<any> {
    return this.http.patch(`${this.getURL(baseUrlType)}/${url}`, body);
  }

  delete(url: string, baseUrlType: BaseUrlTypeEnum = BaseUrlTypeEnum.InternalDashboard): Observable<any> {
    return this.http.delete(`${this.getURL(baseUrlType)}/${url}`);
  }

  getURL(baseUrlType: BaseUrlTypeEnum) {
    if (baseUrlType != BaseUrlTypeEnum.normal) {
      return `${this.BASE_URL}/${BaseUrlTypeEnum[baseUrlType]}`
    }
    return this.BASE_URL;
  }
}

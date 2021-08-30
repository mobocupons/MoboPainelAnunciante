import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DowingToken } from "../../domains/dowing-token.interface";
import { Constants } from "../../utils/constants";
import { BaseUrlTypeEnum } from "../../utils/enums/base-url-type.enum";
import { BaseService } from "../base.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public showLoader = false;

  constructor(
    private baseService: BaseService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private http: HttpClient) { }

  refreshToken(email) {
    const auth = this.localStorageService.getDowingToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${(auth && auth.refresh_token) ? auth.refresh_token : ''}`,
    });

    return this.http.get(
      `${environment.baseUrl}/Backoffice/refresh-token?email=${email}`,
      { headers })
      .pipe(
        map(response => {
          const authenticatedModel = response;
          this.localStorageService.updateTokens(authenticatedModel);
          return response;
        })
      );
  }

  login(user, senha) {
    let loginModel = { user, senha };

    return this.baseService.post("Anunciante/Autenticar", loginModel, BaseUrlTypeEnum.normal);
  }

  getDowingToken() {
    return JSON.parse(localStorage.getItem(Constants.DOWING_TOKEN)) as DowingToken || null;
  }

  logout() {
    this.removeLocalStorage();
    this.router.navigateByUrl('/login');
  }

  removeLocalStorage() {
    localStorage.clear()
  }

  public isTokenExpired(tokenExpirationDate: Date): boolean {
    const now = new Date();
    const expiration = new Date(tokenExpirationDate)
    return now > expiration;
  }
}

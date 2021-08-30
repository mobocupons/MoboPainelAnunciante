import { JwtHelperService } from "@auth0/angular-jwt";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { from, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage.service";
import { AuthService } from "./auth.service";
import { switchMap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  helper = new JwtHelperService();
  isWaitingToken = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.addToken(request)).pipe(
      switchMap((clonedReq) => {
        request = clonedReq;
        return next.handle(request);
      })
    );
  }

  private async addToken(request: HttpRequest<any>) {
    let headers;
    let authObj = this.localStorageService.getDowingToken()
    let token = this.localStorageService.getAccessToken()
    let decodedToken = this.helper.decodeToken(token)

    if (authObj && !request.headers.keys().includes('Authorization')) {
      let accessTokenExpiration = new Date(authObj.accessTokenExpiration);
      let refreshTokenExpiration = new Date(authObj.refreshTokenExpiration);

      if (this.authService.isTokenExpired(refreshTokenExpiration)) {
        await this.authService.logout();
      } else if (this.authService.isTokenExpired(accessTokenExpiration) && !this.isWaitingToken) {
        this.isWaitingToken = true;
        await this.authService.refreshToken(decodedToken.name).toPromise();
        this.isWaitingToken = false;
      }
      authObj = this.localStorageService.getDowingToken()
      headers = {
        Authorization: `Bearer ${authObj.access_token}`,
      };
    }

    headers = {
      ...headers,
      "Content-Type": "application/json",
      accept: "application/json",
    };

    return request.clone({
      setHeaders: headers,
    });
  }

}

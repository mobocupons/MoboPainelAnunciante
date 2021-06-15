import { DowingToken } from "./../domains/dowing-token.interface";
import { Constants } from "./../utils/constants";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() { }

  getDowingToken() {
    return (
      (JSON.parse(
        localStorage.getItem(Constants.DOWING_TOKEN)
      ) as DowingToken) || null
    );
  }

  getAccessToken() {
    return (localStorage.getItem(Constants.ACCESS_TOKEN) as string) || null;
  }

  getManager() {
    return (
      (JSON.parse(localStorage.getItem(Constants.DOWING_TOKEN))
        .manager as any) || null
    );
  }

  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  updateManager(manager: any) {
    let dowingToken = this.getDowingToken();
    dowingToken.manager = manager;
    this.setItem(Constants.DOWING_TOKEN, JSON.stringify(dowingToken));
  }

  updateTokens(dowingToken: any) {
    this.setItem(Constants.DOWING_TOKEN, JSON.stringify(dowingToken));
    this.setItem(Constants.ACCESS_TOKEN, JSON.stringify(dowingToken.access_token));
  }
}

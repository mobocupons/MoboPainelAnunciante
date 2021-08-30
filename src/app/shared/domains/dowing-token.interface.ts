import { Manager } from "./manager.interface";

export interface DowingToken {
  manager: Manager;
  access_token: string;
  accessTokenExpiration: Date;
  refresh_token: string;
  refreshTokenExpiration: Date;
}

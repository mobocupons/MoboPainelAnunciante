import { CommercialPlace } from "./commercial-place.interface";
import { User } from "./user.interface";

export interface Manager {
  userId: string;
  user: User;
  commercialPlaceId: string;
  commercialPlace: CommercialPlace;
  id: string;
  creationDate: Date;
}

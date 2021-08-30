import { RatingStatusEnum } from '../utils/enums/rating-status-enum';
export class RatingModel {
  public id?: string;
  public username?: string;
  public email?: string;
  public date?: string;
  public comment?: string;
  public expandDetail: boolean;
  public status: RatingStatusEnum;
}

import { FinalUsersStatusEnum } from "../utils/enums/final-users-status.enum";

export class FinalUsersModel {
  public id: string;
  public lastAccess?: string;
  public name: string;
  public status: FinalUsersStatusEnum;
  public currentCycle: string;
  public creationDate: string;
  public trailName: string;
  public assessmentCounter: string;
  public doneCycleCounter: string;
  public doneTaskCounter: string;
  public sessionCounter: string;
  public timePerCycle: string;
  public totalSpentTime: string;
}

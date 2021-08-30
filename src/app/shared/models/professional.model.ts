import { OccupationArea } from '../domains/occupation-area.interface';
import { Certificate } from '../domains/professional.interface';
import { EvaluationStatusEnum } from '../utils/enums/evaluation-status.enum';
import { TotalAssistanceEnum } from '../utils/enums/total-assistance.enum';

export class ProfessionalModel {
  public creationDate?: string;
  public certificates?: Certificate[];
  public approvalDate?: string
  public availableTimes?: string
  public averageAssistanceValue: string
  public averageRating: number; //Enum Appointment
  public cityId: string;
  public cpf?: string
  public email: string;
  public evaluationStatus: EvaluationStatusEnum;
  public evaluationDate?: string;
  public experienceTime: number; //Enum Experience
  public formation: string;
  public id: string;
  public name: string;
  public occupationAreas: OccupationArea[]
  public phoneNumber: string;
  public presentation: string;
  public professionalUserId: string;
  public profileImagePath: string;
  public selectedPriceLevel: any;
  public selectedPriceLevelId: string;
  public sessionCount: number
  public skills: any[];
  public collapsed: boolean;
  public priceLevels: any[];
  public isActive?: boolean;
  public status?: string;
  public totalAssistance: TotalAssistanceEnum;
  public specializations: any[];
  public stripeInvite: string;
  public stripeId: string;

  constructor() {
    this.priceLevels = [];
  }
}

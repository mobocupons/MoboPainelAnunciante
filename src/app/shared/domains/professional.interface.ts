export interface Professional {
  approvalDate: Date;
  availableTimes: any[];
  averageAssistanceValue: number;
  certificates: Certificate[];
  cityId: number;
  cpf?: any;
  creationDate: Date;
  customOccupationArea: string;
  deletionDate?: any;
  email: string;
  evaluation: Evaluation;
  evaluationDate: Date;
  experienceTime: number;
  externalPresentationVideoLink?: any;
  formation: string;
  id: string;
  lastChangeDate: Date;
  name: string;
  phoneNumber: string;
  presentation: string;
  presentationVideo: PresentationVideo;
  professionalHasOccupationAreas: any[];
  professionalHasSkills: ProfessionalHasSkill[];
  professionalHasSpecializations: any[];
  professionalUserId: string;
  profileImagePath: string;
  ratings?: any;
  schedulings?: any;
  selectedPriceLevel: SelectedPriceLevel;
  selectedPriceLevelId: string;
  stripeId?: any;
  stripeInviteWasSent: boolean;
  totalAssistance: number;
}

export interface SelectedPriceLevel {
  name: string;
  sessionValuePF: number;
  sessionValuePJ: number;
  professionalPartPF: number;
  dowingPartPF: number;
  professionalPartPJ: number;
  dowingPartPJ: number;
  professionalEvaluationHasPriceLevels?: any;
  id: string;
  creationDate: Date;
  deletionDate?: any;
  lastChangeDate?: any;
}

export interface Skill {
  name: string;
  professionalHasSkills: any[];
  id: string;
  creationDate: Date;
  deletionDate?: any;
  lastChangeDate?: any;
}

export interface ProfessionalHasSkill {
  professionalId: string;
  skill: Skill;
  skillId: string;
}

export interface Certificate {
  type: number;
  cloudId: string;
  fileName?: any;
  mimeType: string;
  id: string;
  creationDate: Date;
  deletionDate?: any;
  lastChangeDate: Date;
}

export interface PresentationVideo {
  cloudId: string;
  fileName?: any;
  mimeType: string;
  id: string;
  creationDate: Date;
  deletionDate?: any;
  lastChangeDate: Date;
}

export interface Evaluation {
  professionalId: string;
  backofficeUserId: string;
  backofficeUser?: any;
  evaluationStatus: number;
  professionalEvaluationHasPriceLevels?: any;
  id: string;
  creationDate: Date;
  deletionDate?: any;
  lastChangeDate: Date;
}

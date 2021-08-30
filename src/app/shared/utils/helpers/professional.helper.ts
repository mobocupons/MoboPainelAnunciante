import { EvaluationStatusEnum } from "../enums/evaluation-status.enum";

export module ProfessionalHelper {
  export function getEvaluationStatusDescription(
    evaluationStatus: EvaluationStatusEnum
  ) {
    let description: string;
    switch (evaluationStatus) {
      case EvaluationStatusEnum.All:
        description = "Todos";
        break;
      case EvaluationStatusEnum.PendingDocuments:
        description = "Documentação pendente";
        break;
      case EvaluationStatusEnum.PendingEvaluation:
        description = "Avaliação Pendente";
        break;
      case EvaluationStatusEnum.PendingPriceSelection:
        description = "Seleção preço pendente";
        break;
      case EvaluationStatusEnum.PendingStripeRegister:
        description = 'Email Stripe Pendente';
        break;
      case EvaluationStatusEnum.PendingStripeAssociationId:
        description = 'Stripe ID Pendente';
        break;
      case EvaluationStatusEnum.PendingAvailableTimes:
        description = "Horários pendentes";
        break;
      case EvaluationStatusEnum.Active:
        description = "Ativo";
        break;
      case EvaluationStatusEnum.Rejected:
        description = "Rejeitado";
        break;
    }
    return description;
  }

  export function getEvaluationStatusColorStamp(
    evaluationStatus: EvaluationStatusEnum
  ) {
    let stampColor: string;
    switch (evaluationStatus) {
      case EvaluationStatusEnum.PendingEvaluation:
        stampColor = "#FF7534";
        break;
      case EvaluationStatusEnum.PendingDocuments:
        stampColor = "#FFAAB2";
        break;
      case EvaluationStatusEnum.PendingPriceSelection:
        stampColor = "#FF8C19";
        break;
      case EvaluationStatusEnum.PendingStripeRegister:
        stampColor = "#DFA712";
        break;
      case EvaluationStatusEnum.PendingStripeAssociationId:
        stampColor = "#F2C94C";
        break;
      case EvaluationStatusEnum.PendingAvailableTimes:
        stampColor = "#FEC600";
        break;
      case EvaluationStatusEnum.Active:
        stampColor = "#3CC8B4";
        break;
      case EvaluationStatusEnum.Rejected:
        stampColor = "#FF7070";
        break;
    }
    return stampColor;
  }
}

import { FinalUsersStatusEnum } from "../enums/final-users-status.enum";
import { FinalUsersPropertiesEnum } from "../enums/final-users-properties.enum";

export module UserHelper {
  export function getFinalUsersStatusDescription(
    finalUserStatus: FinalUsersStatusEnum
  ) {
    let description: string;
    switch (finalUserStatus) {
      case FinalUsersStatusEnum.All:
        description = "Todos";
        break;
      case FinalUsersStatusEnum.Active:
        description = "Ativo";
        break;
      case FinalUsersStatusEnum.Inactive:
        description = "Inativo";
        break;
      case FinalUsersStatusEnum.Blocked:
        description = "Bloqueado";
        break;
    }
    return description;
  }

  export function getFinalUsersStatusColorStamp(
    finalUserStatus: FinalUsersStatusEnum
  ) {
    let stampColor: string;
    switch (finalUserStatus) {
      case FinalUsersStatusEnum.Active:
        stampColor = "#3CC8B4";
        break;
      case FinalUsersStatusEnum.Inactive:
        stampColor = "#FF8C19";
        break;
      case FinalUsersStatusEnum.Blocked:
        stampColor = "#FF7070";
        break;
    }
    return stampColor;
  }

  export function getFinalUsersPropertiesDescripion(
    finalUserPropertie: FinalUsersPropertiesEnum
  ) {
    let description: string;
    switch (finalUserPropertie) {
      case FinalUsersPropertiesEnum.assessmentCounter:
        description = "Assessment";
        break;
      case FinalUsersPropertiesEnum.creationDate:
        description = "Data de Criação";
        break;
      case FinalUsersPropertiesEnum.currentCycle:
        description = "Ciclo Atual";
        break;
      case FinalUsersPropertiesEnum.doneCycleCounter:
        description = "Ciclos Conluídos";
        break;
      case FinalUsersPropertiesEnum.doneTaskCounter:
        description = "Nº Tarefas Concluídas";
        break;
      case FinalUsersPropertiesEnum.sessionCounter:
        description = "Sessões";
        break;
      case FinalUsersPropertiesEnum.timePerCycle:
        description = "Tempo por Ciclo";
        break;
      case FinalUsersPropertiesEnum.totalSpentTime:
        description = "Tempo de Uso";
        break;
      case FinalUsersPropertiesEnum.trailName:
        description = "Trilhas";
        break;
    }
    return description;
  }
}

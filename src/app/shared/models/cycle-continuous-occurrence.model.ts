import { CycleContinuousOccurrenceEnum } from "../utils/enums/cycle-continuous-occurrence.enum";

export class CycleContinuousOccurrenceModel {
  public ocurrence: CycleContinuousOccurrenceEnum;
  public description: string;

  constructor(ocurrence: CycleContinuousOccurrenceEnum) {
    this.ocurrence = ocurrence;
    this.numberText(ocurrence);
  }

  public numberText(ocurrence) {
    let text: string;
    switch (ocurrence) {
      case CycleContinuousOccurrenceEnum.Once:
        text = "1 (uma) vez";
        break;
      case CycleContinuousOccurrenceEnum.MoreThenOne:
        text = "Mais de 1 (uma) vez";
        break;
      default:
        text = "1 (uma) vez";
        break;
    }
    this.description = text;
  }
}

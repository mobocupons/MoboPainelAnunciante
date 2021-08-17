import { CardTypeEnum } from '../utils/enums/card-type.enum';
import { CycleContinuousOccurrenceEnum } from '../utils/enums/cycle-continuous-occurrence.enum';
export class RequestModel {
  startDate: string;
  endDate: string;
  chartRange: CardTypeEnum;
  cycleId?: string;
  ocurrence?: CycleContinuousOccurrenceEnum;
}

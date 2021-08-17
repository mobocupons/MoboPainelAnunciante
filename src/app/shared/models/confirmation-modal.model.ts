import { ModalTypeEnum } from '../utils/enums/modal-type.enum';

export class ConfirmationModalModel {
  public title: string;
  public mainInformation: string;
  public secondaryInformation: string;
  public modalType: ModalTypeEnum;

  constructor() {
    this.modalType = ModalTypeEnum.help;
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalTypeEnum } from 'src/app/shared/utils/enums/modal-type.enum';
import { ConfirmationModalModel } from 'src/app/shared/models/confirmation-modal.model';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() modalData: ConfirmationModalModel;

  public modalTypeEnum = ModalTypeEnum;

  constructor(public activeModal: NgbActiveModal) {
  }


  ngOnInit() {
  }

  onClose() {
    this.activeModal.close(false);
  }

  onDismiss() {
    this.activeModal.dismiss(false);
  }

  onResult() {
    this.activeModal.close(true);
  }

}

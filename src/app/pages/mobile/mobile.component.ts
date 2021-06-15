import { Component, OnInit } from '@angular/core';
import { MobileService } from '../../shared/services/mobile.service';
import { CardDataModel } from 'src/app/shared/models/card-data.model';
import { RequestModel } from 'src/app/shared/models/request-model';
import { CardDataHelper } from 'src/app/shared/utils/helpers/card-data.helper';
import { ConfirmationModalModel } from 'src/app/shared/models/confirmation-modal.model';
import { RatingModel } from 'src/app/shared/models/rating.model';
import { ModalTypeEnum } from 'src/app/shared/utils/enums/modal-type.enum';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { DateHelper } from 'src/app/shared/utils/helpers/date.helper';
import { RatingStatusEnum } from 'src/app/shared/utils/enums/rating-status-enum';

@Component({
  selector: "app-mobile",
  templateUrl: "./mobile.component.html",
  styleUrls: ["./mobile.component.scss"],
})
export class MobileComponent implements OnInit {
  public modalRef: NgbModalRef;
  public filterBackupData: boolean = false;
  public filterBackupComment: boolean = false;
  public filterBackupEmail: boolean = false;
  public filterBackupUser: boolean = false;

  public cardDataHeader: CardDataModel;
  public cardDataAppUse: CardDataModel;
  public cardDataAccounts: CardDataModel;
  public cardDataInvoicing: CardDataModel;
  public cardDataTypeEnumLocal = CardDataTypeEnumLocal;
  public mdbTableStriped: boolean = true;
  public tabHeaders: any[];
  public tabSelected: RatingStatusEnum;
  public ratingStatusEnum = RatingStatusEnum;

  // Drag and Scroll
  public owlcarouselOptions: any;

  public ratingList: RatingModel[] = [];
  public ratingListBackUp: RatingModel[] = [];

  commentsHeadElements = [
    { description: "Data", type: CommentTableHeadEnumLocal.Date, icon: '<i class="icon-exchange-vertical"></i>', visible: true },
    { description: "Usuário", type: CommentTableHeadEnumLocal.User, icon: '<i class="icon-exchange-vertical"></i>', visible: true },
    { description: "E-mail", type: CommentTableHeadEnumLocal.Email, icon: '<i class="icon-exchange-vertical"></i>', visible: true },
    { description: "Comentário", type: CommentTableHeadEnumLocal.Comments, icon: '<i class="icon-exchange-vertical"></i>', visible: true },
    { description: "Filtro", type: CommentTableHeadEnumLocal.Filter, icon: '<i class="icon-filter"></i>', visible: false },
  ];

  constructor(public mobileService: MobileService, public toster: ToastrService, private modalService: NgbModal) {
    this.cardDataAppUse = new CardDataModel();
    this.cardDataAccounts = new CardDataModel();
    this.cardDataInvoicing = new CardDataModel();

    this.owlcarouselOptions = CardDataHelper.getOwlcarouselOptions();

  }

  ngOnInit() {
    this.setTabHeaders();
    this.getComments();
    this.refreshCounters();
    this.ratingList = this.ratingListBackUp.filter(r => r.status == RatingStatusEnum.Pending);
  }

  private setTabHeaders() {
    this.tabHeaders = [];
    this.tabHeaders.push({
      description: "Pendentes",
      type: RatingStatusEnum.Pending,
      active: true,
      counter: 0
    });
    this.tabHeaders.push({
      description: "Aprovados",
      type: RatingStatusEnum.Approved,
      active: false,
      counter: 0
    });
    this.tabHeaders.push({
      description: "Rejeitados",
      type: RatingStatusEnum.Rejected,
      active: false,
      counter: 0
    });
  }

  refreshCounters() {
    this.tabHeaders.map(t => t.counter = this.ratingListBackUp.filter(r => r.status == t.type).length);
  }

  getComments() {
    this.mobileService.getAllComments().toPromise().then((res) => {
      this.ratingListBackUp = res;
      this.ratingListBackUp.map(r => {
        r.expandDetail = false;
        r.date = DateHelper.formatDate(
          r.date,
          "dd/MM/yyyy"
        );
      });
      this.refreshCounters();
    });
  }

  async updateChart(requestModel: RequestModel, cardType: CardDataTypeEnumLocal) {
    switch (cardType) {
      case CardDataTypeEnumLocal.Header:
        this.cardDataHeader = await this.mobileService.getDownloads(requestModel).toPromise();
        this.cardDataHeader.cardTitle = "Downloads";
        break;
      case CardDataTypeEnumLocal.AppUse:
        this.cardDataAppUse = await this.mobileService.getActiveInative(requestModel).toPromise();
        this.cardDataAppUse.cardTitle = "Uso do Aplicativo";
        break;
      case CardDataTypeEnumLocal.Accounts:
        this.cardDataAccounts = await this.mobileService.getAccounts(requestModel).toPromise();
        this.cardDataAccounts.cardTitle = "Contas";
        break;
      case CardDataTypeEnumLocal.Invoicing:
        this.cardDataInvoicing = await this.mobileService.getInvoicing(requestModel).toPromise();
        this.cardDataInvoicing.cardTitle = "Faturamento";
        break;
    }
  }

  public activeTabChanged(tab: any) {
    this.tabHeaders.map((x) =>
      x.type != tab.type ? (x.active = false) : (x.active = true)
    );
    this.tabSelected = tab.type;
    this.ratingList = this.ratingListBackUp.filter(r => r.status == tab.type);
  }

  updateFilter(event) {
    this.ratingList = this.ratingListBackUp;
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.ratingList.filter(function (d) {
      return d.username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.ratingList = temp;
    // Whenever the filter changes, always go back to the first page
  }

  public orderTableByHead(head) {
    switch (head) {
      case CommentTableHeadEnumLocal.Date:
        this.orderTableByData();
        break;
      case CommentTableHeadEnumLocal.User:
        this.orderTableByUser();
        break;
      case CommentTableHeadEnumLocal.Email:
        this.orderTableByEmail();
        break;
      case CommentTableHeadEnumLocal.Comments:
        this.orderTableByComment();
        break;
      default:
        this.openFilterModal();
        break;
    }
  }

  showDetails(element: any) {
    element.expandDetail = !element.expandDetail;
  }

  openFilterModal() {
    console.log("openFilterModal");
  }

  openModalToApproveRating(rating: RatingModel) {
    let modalData = new ConfirmationModalModel();
    modalData.title = "Aprovar?";
    modalData.mainInformation = `Deseja realmente aprovar esse Comentário: <br/>"<b>${rating.comment}</b>"?`;
    modalData.modalType = ModalTypeEnum.success;
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {
      size: "md",
      centered: true,
    });
    this.modalRef.componentInstance.modalData = modalData;
    this.modalRef.result.then((result) => {
      if (result) {
        this.toApproveRating(rating);
      }
    });
  }

  openModalToReproveRating(rating: RatingModel) {
    let modalData = new ConfirmationModalModel();
    modalData.title = "Reprovar?";
    modalData.mainInformation = `Deseja realmente reprovar esse Comentário: <br/>"<b>${rating.comment}</b>"?`;
    modalData.modalType = ModalTypeEnum.help;
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {
      size: "md",
      centered: true,
    });
    this.modalRef.componentInstance.modalData = modalData;
    this.modalRef.result.then((result) => {
      if (result) {
        this.toReproveRating(rating);
      }
    });
  }

  async toApproveRating(rating: RatingModel) {
    await this.mobileService.approveComment(rating.id).toPromise().then((res) => {
      if (res) {
        this.toster.success("Comentário aprovado com sucesso!");
      }
    })
  }

  async toReproveRating(rating: RatingModel) {
    await this.mobileService.reproveComment(rating.id).toPromise().then((res) => {
      if (res) {
        this.toster.success("Comentário reprovado!");
      }
    })
  }

  orderTableByComment() {
    if (!this.filterBackupComment) {
      this.ratingList.sort((a, b) =>
        a.comment.localeCompare(b.comment)
      );
    } else {
      this.ratingList.sort((a, b) =>
        b.comment.localeCompare(a.comment)
      );
    }
    this.filterBackupComment = !this.filterBackupComment;
  }
  orderTableByUser() {
    if (!this.filterBackupUser) {
      this.ratingList.sort((a, b) => a.username.localeCompare(b.username));
    } else {
      this.ratingList.sort((a, b) => b.username.localeCompare(a.username));
    }
    this.filterBackupUser = !this.filterBackupUser;
  }
  orderTableByData() {
    if (!this.filterBackupData) {
      this.ratingList.sort((a, b) => a.date.localeCompare(b.date));
    } else {
      this.ratingList.sort((a, b) => b.date.localeCompare(a.date));
    }
    this.filterBackupData = !this.filterBackupData;
  }

  orderTableByEmail() {
    if (!this.filterBackupEmail) {
      this.ratingList.sort((a, b) => a.email.localeCompare(b.email));
    } else {
      this.ratingList.sort((a, b) => b.email.localeCompare(a.email));
    }
    this.filterBackupEmail = !this.filterBackupEmail;
  }
}

export enum CommentTableHeadEnumLocal {
  Date,
  User,
  Email,
  Comments,
  Filter
}
export enum CardDataTypeEnumLocal {
  Header,
  AppUse,
  Accounts,
  Invoicing
}


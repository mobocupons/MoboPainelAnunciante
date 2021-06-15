import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ProfessionalService } from "src/app/shared/services/professional.service";
import { PriceLevelService } from "src/app/shared/services/price-level.service";
import { CardDataModel } from "src/app/shared/models/card-data.model";
import { DocsModalModel } from "src/app/shared/models/docs-modal-model";
import { RequestModel } from "src/app/shared/models/request-model";
import { ProfessionalModel } from "src/app/shared/models/professional.model";
import { OccupationArea } from "src/app/shared/domains/occupation-area.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import {
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { ExperienceEnum } from "src/app/shared/utils/enums/experience.enum";
import { TotalAssistanceEnum } from "src/app/shared/utils/enums/total-assistance.enum";
import { PriceLevel } from "src/app/shared/domains/price-level.interface";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { EvaluationStatusEnum } from "src/app/shared/utils/enums/evaluation-status.enum";
import { ConfirmationModalComponent } from "src/app/shared/components/confirmation-modal/confirmation-modal.component";
import { ConfirmationModalModel } from "src/app/shared/models/confirmation-modal.model";
import { ModalTypeEnum } from "src/app/shared/utils/enums/modal-type.enum";
import { CardDataHelper } from "src/app/shared/utils/helpers/card-data.helper";
import { DateHelper } from "src/app/shared/utils/helpers/date.helper";
import { ProfessionalHelper } from "src/app/shared/utils/helpers/professional.helper";
import { StripeInviteModel } from "src/app/shared/models/stripe.invite.model";
import { UpdateStripeIdModel } from "src/app/shared/models/update-stripeId-model";
import { DOCUMENT } from "@angular/common";
import { FilterModalComponent } from "src/app/shared/components/filter-modal/filter-modal.component";
import { FilterModalModel } from "src/app/shared/models/filter-modal.model";
import { DocsModalComponent } from "./docs-modal/docs-modal.component";
import { environment } from "../../../environments/environment"

@Component({
  selector: "app-professionals",
  templateUrl: "./professionals.component.html",
  styleUrls: ["./professionals.component.scss"],
})
export class ProfessionalsComponent implements OnInit {
  @ViewChild("meuCanvas", { static: true }) elemento: ElementRef;

  public occupationAreaForm: FormGroup;
  public OccupationAreaList: OccupationArea[];
  public activeTab: boolean;
  public paginaAtual = 1;
  public cardDataHeader: CardDataModel;
  public cardDataSessions: CardDataModel;
  public occupationAreaToDelete: OccupationArea;
  public priceLevelList: PriceLevel[];
  public loadingOccupationArea: boolean;
  public dropdownSettings: IDropdownSettings = {};
  public professionalSelected: ProfessionalModel;
  public modalRef: NgbModalRef;
  public mdbTableStriped: boolean = true;
  public professionalHelper = ProfessionalHelper;
  public stripeCode: string;
  public filterModalData: FilterModalModel;

  public cardDataTypeEnumLocal = CardDataTypeEnumLocal;
  public selectedTab: EvaluationStatusEnum;
  public evaluationStatusEnum = EvaluationStatusEnum;
  public professionalTableHeadEnumLocal = ProfessionalTableHeadEnumLocal;


  public isLoadingDocs: boolean = false;
  public isLoadingProfessionals: boolean = false;

  public professionalTableTabRegister: boolean;

  public professionalList: ProfessionalModel[] = [];
  private professionalListBackup: ProfessionalModel[] = [];
  private professionalTabList: ProfessionalModel[] = [];

  public headElements = [
    {
      description: "Data",
      visible: true,
      type: ProfessionalTableHeadEnumLocal.Date,
      icon: '<i class="icon-exchange-vertical"></i>'
    },
    {
      description: "Profissional",
      visible: true,
      type: ProfessionalTableHeadEnumLocal.Professional,
      icon: '<i class="icon-exchange-vertical"></i>'
    },
    {
      description: "Status",
      visible: true,
      type: ProfessionalTableHeadEnumLocal.Status,
      icon: '<i class="icon-exchange-vertical"></i>'
    },
    {
      description: "Filtro",
      visible: true,
      type: ProfessionalTableHeadEnumLocal.Filter,
      icon: '<i class="icon-filter"></i>'
    }
  ];

  // Drag and Scroll
  public owlcarouselOptions: any;

  public tabHeaders: any[];

  constructor(private professionalService: ProfessionalService, private priceLevelService: PriceLevelService, private fb: FormBuilder, public toster: ToastrService, private modalService: NgbModal, @Inject(DOCUMENT) private _document: HTMLDocument) {
    this.cardDataSessions = new CardDataModel();
    this.occupationAreaForm = this.fb.group({
      name: ["", Validators.required],
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      searchPlaceholderText: "Procurar",
      allowSearchFilter: true,
      enableCheckAll: false,
    };

    this.owlcarouselOptions = CardDataHelper.getOwlcarouselOptions();
  }

  ngOnInit() {
    this.setTabHeaders();
    this.getAllOccupationArea();
    this.getAll();
    this.getAllPriceLevel();
  }

  private setTabHeaders() {
    this.tabHeaders = [];
    this.tabHeaders.push({
      description: ProfessionalHelper.getEvaluationStatusDescription(
        EvaluationStatusEnum.All
      ),
      type: EvaluationStatusEnum.All,
      active: true,
      counter: 0
    });
    this.tabHeaders.push({
      description: ProfessionalHelper.getEvaluationStatusDescription(
        EvaluationStatusEnum.PendingEvaluation
      ),
      type: EvaluationStatusEnum.PendingEvaluation,
      active: false,
      counter: 0
    });
    this.tabHeaders.push({
      description: ProfessionalHelper.getEvaluationStatusDescription(
        EvaluationStatusEnum.PendingStripeRegister
      ),
      type: EvaluationStatusEnum.PendingStripeRegister,
      active: false,
      counter: 0
    });
    this.tabHeaders.push({
      description: ProfessionalHelper.getEvaluationStatusDescription(
        EvaluationStatusEnum.PendingStripeAssociationId
      ),
      type: EvaluationStatusEnum.PendingStripeAssociationId,
      active: false,
      counter: 0
    });
    this.tabHeaders.push({
      description: ProfessionalHelper.getEvaluationStatusDescription(
        EvaluationStatusEnum.PendingPriceSelection
      ),
      type: EvaluationStatusEnum.PendingPriceSelection,
      active: false,
      counter: 0
    });
    this.tabHeaders.push({
      description: ProfessionalHelper.getEvaluationStatusDescription(
        EvaluationStatusEnum.PendingAvailableTimes
      ),
      type: EvaluationStatusEnum.PendingAvailableTimes,
      active: false,
      counter: 0
    });
    this.tabHeaders.push({
      description: ProfessionalHelper.getEvaluationStatusDescription(
        EvaluationStatusEnum.Active
      ),
      type: EvaluationStatusEnum.Active,
      active: false,
      counter: 0
    });
    this.tabHeaders.push({
      description: ProfessionalHelper.getEvaluationStatusDescription(
        EvaluationStatusEnum.Rejected
      ),
      type: EvaluationStatusEnum.Rejected,
      active: false,
      counter: 0
    });
  }

  private async getAllPriceLevel() {
    await this.priceLevelService
      .getAll()
      .toPromise()
      .then((res) => {
        this.priceLevelList = res.sort((a, b) =>
          a.sessionValuePF > b.sessionValuePF ? 1 : -1
        );
      });
  }

  private async getAll() {
    this.professionalList = [];
    this.isLoadingProfessionals = true;
    await this.professionalService
      .getAll()
      .toPromise()
      .then((res) => {
        this.professionalList = res;
        this.professionalList.map((p) => {
          p.collapsed = false;
          p.creationDate = DateHelper.formatDate(
            p.creationDate,
            "dd/MM/yyyy - HH:MM"
          );

          p.status = ProfessionalHelper.getEvaluationStatusDescription(
            p.evaluationStatus
          );

          p.priceLevels = p.priceLevels
            ? p.priceLevels.sort((a, b) =>
              a.sessionValuePF > b.sessionValuePF ? 1 : -1
            )
            : p.priceLevels;
        });
      })
      .catch(err => {
        console.error(err);
      });
    this.isLoadingProfessionals = false;
    this.setTabCounters();

    this.selectedTab = EvaluationStatusEnum.All;
    this.tabHeaders.map((t) =>
      t.type == EvaluationStatusEnum.All
        ? (t.active = true)
        : (t.active = false)
    );
    this.professionalListBackup = this.professionalList;
  }

  private async getAllOccupationArea() {
    this.loadingOccupationArea = true;
    await this.professionalService
      .getOccupationArea()
      .toPromise()
      .then((res) => {
        this.OccupationAreaList = res.sort((a, b) =>
          a.name.toLowerCase() == "outra" ? 1 : a.name > b.name ? 1 : -1
        );
      });
    this.loadingOccupationArea = false;
  }

  async addOccupationArea() {
    if (!this.existsOccupationArea()) {
      this.loadingOccupationArea = true;
      let occupationAreaToSave: any = {
        name: this.occupationAreaForm.controls["name"].value,
      };
      await this.professionalService
        .saveOccupationArea(occupationAreaToSave)
        .toPromise()
        .then((res) => {
          this.OccupationAreaList.push(res);
          this.OccupationAreaList.sort((a, b) =>
            a.name.toLowerCase() == "outra" ? 1 : a.name > b.name ? 1 : -1
          );
        });
      this.loadingOccupationArea = false;
    } else {
      this.toster.warning(
        "Área de atuação existente. Por favor verifique a lista."
      );
    }
  }

  async openDocumentsModal(professionalId: string) {
    this.isLoadingDocs = true;
    let professional = await this.professionalService
      .get(professionalId)
      .toPromise();
    let docs = await this.getAllDocs(professional);
    this.isLoadingDocs = false;
    this.modalRef = this.modalService.open(DocsModalComponent, {
      size: "lg",
      centered: true,
    });

    this.modalRef.componentInstance.modalData = docs;
  }

  async getAllDocs(professional) {
    let docs = [] as DocsModalModel[];

    if (professional.certificates[0]) {
      docs = await professional.certificates.map((document, index) => {
        return {
          name: `Certificado ${index + 1}`,
          url: `${environment.awsBaseFiles}/${document.cloudId}.${document.mimeType}`,
          isExternal: false,
        };
      });
    }

    if (professional?.presentationVideo?.cloudId) {
      docs.push({
        name: `Vídeo de Apresentação`,
        url: `${environment.awsBaseFiles}/${professional.presentationVideo.cloudId}.${professional.presentationVideo.mimeType}`,
        isExternal: false,
      });
    }

    if (professional.externalPresentationVideoLink) {
      docs.push({
        name: `Vídeo de Apresentação`,
        url: professional.externalPresentationVideoLink,
        isExternal: true,
      });
    }

    return docs;
  }

  openModalDeleteOccupationArea(occuparionArea: OccupationArea) {
    let modalData = new ConfirmationModalModel();
    modalData.title = "Excluir?";
    modalData.mainInformation = `Deseja realmente excluir esta Área de atuação: <b>${occuparionArea.name}</b>?`;
    modalData.modalType = ModalTypeEnum.alert;
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {
      size: "md",
      centered: true,
    });
    this.modalRef.componentInstance.modalData = modalData;
    this.modalRef.result.then((result) => {
      if (result) {
        this.deleteOccupationArea(occuparionArea);
      }
    });
  }

  openModalToApprove(professional: ProfessionalModel) {
    let modalData = new ConfirmationModalModel();
    modalData.title = "Aprovar?";
    modalData.mainInformation = `Deseja realmente aprovar o Profissional <b>${professional.name}</b>?`;
    modalData.modalType = ModalTypeEnum.success;
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {
      size: "md",
      centered: true,
    });
    this.modalRef.componentInstance.modalData = modalData;
    this.modalRef.result.then((result) => {
      if (result) {
        this.toApprove(professional);
      }
    });
  }

  openModalToReject(professional: ProfessionalModel) {
    let modalData = new ConfirmationModalModel();
    modalData.title = "Rejeitar?";
    modalData.mainInformation = `Deseja realmente rejeitar o Profissional <b>${professional.name}</b>?`;
    modalData.modalType = ModalTypeEnum.alert;
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {
      size: "md",
      centered: true,
    });
    this.modalRef.componentInstance.modalData = modalData;
    this.modalRef.result.then((result) => {
      if (result) {
        this.toReject(professional);
      }
    });
  }

  async deleteOccupationArea(occuparionArea: OccupationArea) {
    await this.professionalService
      .deleteOccupationArea(occuparionArea)
      .toPromise()
      .then((res) => {
        this.toster.warning(
          "Área de atuação excluída com sucesso."
        );
      });
  }

  existsOccupationArea() {
    return this.OccupationAreaList.some(
      (x) =>
        x.name.toLowerCase() ==
        this.occupationAreaForm.controls["name"].value.toLowerCase()
    );
  }

  updateFilter(event) {
    this.professionalList = [];
    if (event && event.target.value) {
      const val = event.target.value.toLowerCase();

      const temp = this.professionalTabList.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });

      this.professionalList = temp;
    } else {
      this.professionalList = this.professionalTabList;
    }
  }

  async updateChart(
    requestModel: RequestModel,
    cardType: CardDataTypeEnumLocal
  ) {
    switch (cardType) {
      case CardDataTypeEnumLocal.Header:
        await this.professionalService
          .getActiveInative(requestModel)
          .toPromise()
          .then((res) => {
            this.cardDataHeader = res;
            this.cardDataHeader.cardTitle = "Ativos";
          });
        break;
      case CardDataTypeEnumLocal.Sessions:
        await this.professionalService
          .getSessions(requestModel)
          .toPromise()
          .then((res) => {
            this.cardDataSessions = res;
            this.cardDataSessions.cardTitle = "Quantidade de sessões";
          });
    }
  }

  public chartClicked(e: any): void { }

  public chartHovered(e: any): void { }

  public activeTabChanged(tab: any) {
    this.tabHeaders.map((x) =>
      x.type != tab.type ? (x.active = false) : (x.active = true)
    );
    this.selectedTab = tab.type;
    if (tab.type != EvaluationStatusEnum.All) {
      this.professionalList = this.professionalListBackup.filter(p => p.evaluationStatus == tab.type);
      this.headElements.map((h) =>
        h.description == "Status" ? (h.visible = false) : h.visible
      );
    } else {
      this.professionalList = this.professionalListBackup;
      this.headElements.map((h) => (h.visible = true));
    }
    this.professionalList.map((p) => (p.collapsed = false));
    this.professionalTabList = this.professionalList;
  }

  public orderTableByHead(head) {
    switch (head) {
      case ProfessionalTableHeadEnumLocal.Date:
        this.orderTableByData();
        break;
      case ProfessionalTableHeadEnumLocal.Professional:
        this.orderTableByProfissional();
        break;
      case ProfessionalTableHeadEnumLocal.Status:
        this.orderTableByStatus();
        break;
      case ProfessionalTableHeadEnumLocal.Filter:
        this.openFilterModal();
        break;
    }
  }

  details(professional: ProfessionalModel) {
    professional.collapsed = !professional.collapsed;
    if (professional.evaluationStatus == EvaluationStatusEnum.Active) {
      setTimeout(() => {
        this.professionalList
          .filter((x) => x.evaluationStatus == EvaluationStatusEnum.Active)
          .forEach((professional) => {
            let multiselector = this._document.getElementById(
              `${professional.id}`
            );
            if (multiselector) {
              let pricesSelectedLabels = multiselector.querySelectorAll(
                ".dropdown-btn>span.ng-star-inserted"
              );

              pricesSelectedLabels.forEach((item: HTMLElement) => {
                if (
                  item.innerText.includes(professional.selectedPriceLevel.name)
                ) {
                  item.style.backgroundColor = "purple";
                  item.style.borderColor = "purple";
                  item.innerHTML = professional.selectedPriceLevel.name;
                }
              });

              let element = multiselector.querySelector(
                "[aria-label='" + professional.selectedPriceLevel.name + "']"
              ) as HTMLInputElement;
              element.disabled = true;
              let parentElement = element.parentNode as HTMLElement;
              parentElement.style.pointerEvents = "none";
            }
          });
      }, 100);
    }
  }

  openFilterModal() {
    let modalData: FilterModalModel[] = [];
    let ocuppationList: any[] = [];
    let specializationList: any[] = [];


    this.professionalListBackup.map(x => x.occupationAreas.map(o => !ocuppationList.includes(o) && ocuppationList.push(o)));
    modalData.push(
      {
        description: "Áreas de atuação",
        filterList: this.listOfFilters(ocuppationList),
        selected: false,
        type: FilterOptionEnumLocal.OccupationArea
      });

    this.professionalListBackup.map(x => x.specializations.map(s => !specializationList.includes(s) && specializationList.push(s)));
    modalData.push(
      {
        description: "Especializações",
        filterList: this.listOfFilters(specializationList),
        selected: false,
        type: FilterOptionEnumLocal.Specializations
      });

    var experienceTime = Object.keys(ExperienceEnum).filter(key => isNaN(Number(ExperienceEnum[key])));

    let experienceTimeText = experienceTime.map(ex => this.getExperienceTimeText(Number(ex)));

    modalData.push(
      {
        description: "Tempo de experiência",
        filterList: this.listOfFilters(experienceTimeText),
        selected: false,
        type: FilterOptionEnumLocal.ExperienceTime
      });

    if (this.filterModalData) {
      modalData.map(m => {
        (m.description == this.filterModalData.description) ? m.selected = this.filterModalData.selected : false;
        m.filterList.map(fl => fl.selected = this.filterModalData.filterList.some(fmd => fmd.description == fl.description));
      });
    }

    this.modalRef = this.modalService.open(FilterModalComponent, { windowClass: 'modal-filter' });
    this.modalRef.componentInstance.modalData = modalData;
    this.modalRef.result.then((result) => {
      if (result) {
        if (!result.cancel) {
          switch (result.type) {
            case FilterOptionEnumLocal.OccupationArea:
              this.professionalList = this.professionalListBackup.filter(p => p.occupationAreas.some(o => result.filterList.some(r => r.description == o)));
              break;
            case FilterOptionEnumLocal.ExperienceTime:
              this.professionalList = this.professionalListBackup.filter(p => result.filterList.some(r => r.description == this.getExperienceTimeText(p.experienceTime)));
              break;
            case FilterOptionEnumLocal.Specializations:
              this.professionalList = this.professionalListBackup.filter(p => p.specializations.some(s => result.filterList.some(r => r.description == s)));
              break;
          }
          this.setTabCounters();
          this.filterModalData = result;
        }
      }
      else {
        this.filterModalData = null;
        this.professionalList = this.professionalListBackup;
        this.setTabCounters();
      }
    });
  }

  setTabCounters() {
    this.tabHeaders.map(tab => tab.counter = (tab.type == this.evaluationStatusEnum.All) ? this.professionalList.length : this.professionalList.filter(p => p.evaluationStatus == tab.type).length);
  }

  listOfFilters(listFilter: string[]): FilterModalModel[] {
    let newFilterList: FilterModalModel[] = [];
    listFilter.forEach((item) => {
      newFilterList.push({
        description: item,
        filterList: [],
        selected: false,
        type: FilterOptionEnumLocal.Specializations
      })
    });
    return newFilterList
  }

  orderTableByStatus() {
    this.professionalList = this.professionalList.sort((a, b) =>
      a.status > b.status ? 1 : -1
    );
  }

  orderTableByProfissional() {
    this.professionalList = this.professionalList.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
  }

  orderTableByData() {
    this.professionalList = this.professionalList.sort((a, b) =>
      a.creationDate > b.creationDate ? 1 : -1
    );
  }

  checkPriceLevelSelectLimit(professional: ProfessionalModel) {
    if (professional.priceLevels.length > 3) {
      this.toster.info("Máximo de 3 níveis");
    }
  }

  async toApprove(professional: ProfessionalModel) {
    await this.professionalService
      .toApproveReject(
        professional.id,
        professional.priceLevels,
        EvaluationStatusEnum.Approved
      )
      .toPromise()
      .then((res) => {
        if (res.id) {
          this.toster.success("Profissional aprovado com sucesso!");
        }
      });
    this.getAll();
  }

  async toReject(professional: ProfessionalModel) {
    await this.professionalService
      .toApproveReject(professional.id, null, EvaluationStatusEnum.Rejected)
      .toPromise()
      .then((res) => {
        if (res.id) {
          this.toster.success("Profissional rejeitado com sucesso!");
        }
      });
    this.getAll();
  }

  saveStripeCode(professional: ProfessionalModel) {
    let modalData = new ConfirmationModalModel();
    modalData.title = "Salvar/Enviar";
    modalData.mainInformation = `Deseja salvar/enviar esse Link do Stripe?`;
    modalData.modalType = ModalTypeEnum.help;
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {
      size: "md",
      centered: true,
    });
    this.modalRef.componentInstance.modalData = modalData;
    this.modalRef.result.then(async (result) => {
      if (result) {
        let stripeInvite = new StripeInviteModel();
        stripeInvite.recipientName = professional.name;
        stripeInvite.recipientEmail = professional.email;
        stripeInvite.stripeInviteURL = professional.stripeInvite;
        await this.professionalService
          .saveStripeInvite(stripeInvite)
          .toPromise()
          .then((res) => {
            this.toster.success("Código Stripe salvo com sucesso!");
          });
        this.getAll();
      }
    });
  }

  async saveStripeIDOrPriceLevels(professional: ProfessionalModel) {
    let modalData = new ConfirmationModalModel();
    modalData.title = "Salvar";
    modalData.mainInformation = `Deseja salvar?`;
    modalData.modalType = ModalTypeEnum.help;
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {
      size: "md",
      centered: true,
    });
    this.modalRef.componentInstance.modalData = modalData;
    this.modalRef.result.then(async (result) => {
      if (result) {
        let updateStripeIdModel = new UpdateStripeIdModel();
        updateStripeIdModel.professionalId = professional.id;
        updateStripeIdModel.stripeId = professional.stripeId;
        updateStripeIdModel.priceLevels = professional.priceLevels;
        await this.professionalService
          .updateStripeId(updateStripeIdModel)
          .toPromise()
          .then((res) => {
            this.toster.success("Dados salvo com sucesso!");
          });
        this.getAll();
      }
    });
  }

  getExperienceTimeText(experienceTime: ExperienceEnum) {
    let text: string = "";
    switch (experienceTime) {
      case ExperienceEnum.LessThanOneYear:
        text = "menos de 1 ano";
        break;
      case ExperienceEnum.OneYear:
        text = "1 ano";
        break;
      case ExperienceEnum.FromTwoToFiveYears:
        text = "2-5 anos";
        break;
      case ExperienceEnum.FromFiveToTenYears:
        text = "5 - 10 anos";
        break;
      case ExperienceEnum.MoreThanTenYears:
        text = "mais de 10 anos";
        break;
      default:
        text = "---";
        break;
    }
    return text;
  }

  getTotalAssistanceText(totalAssistance: TotalAssistanceEnum) {
    let text: string = "";
    switch (totalAssistance) {
      case TotalAssistanceEnum.FromOneToTen:
        text = "1-10";
        break;
      case TotalAssistanceEnum.FromTenToTwenty:
        text = "10-20";
        break;
      case TotalAssistanceEnum.FromTwentyToFifty:
        text = "20-50";
        break;
      case TotalAssistanceEnum.FromFiftyToOneHundred:
        text = "50 - 100";
        break;
      case TotalAssistanceEnum.MoreThanOneHundred:
        text = "mais de 100";
        break;
      default:
        text = "---";
        break;
    }
    return text;
  }

  priceLevesIsOK(professional: ProfessionalModel) {
    return (
      !professional.priceLevels ||
      professional.priceLevels.length <= 0 ||
      professional.priceLevels.length < 3 ||
      professional.priceLevels.length > 3 ||
      (professional.evaluationDate && !professional.approvalDate)
    );
  }
}

export enum CardDataTypeEnumLocal {
  Header,
  Sessions,
}

export enum ProfessionalTableHeadEnumLocal {
  Date,
  Professional,
  Status,
  Filter,
}

export enum FilterOptionEnumLocal {
  OccupationArea,
  Specializations,
  ExperienceTime
}


import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { CardDataModel } from "src/app/shared/models/card-data.model";
import { CardDataHelper } from "src/app/shared/utils/helpers/card-data.helper";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { FilterModalModel } from "src/app/shared/models/filter-modal.model";
import { UserService } from "src/app/shared/services/user.service";
import { FinalUsersModel } from "src/app/shared/models/final-users.model";
import { AssessmentModel } from "src/app/shared/models/assessment.model";
import { ToastrService } from "ngx-toastr";
import { DateHelper } from "src/app/shared/utils/helpers/date.helper";
import { FinalUsersStatusEnum } from "src/app/shared/utils/enums/final-users-status.enum";
import { RequestModel } from "src/app/shared/models/request-model";
import { FilterModalComponent } from "src/app/shared/components/filter-modal/filter-modal.component";
import { UserHelper } from "src/app/shared/utils/helpers/user.helper";
import { UtilsHelper } from "src/app/shared/utils/helpers/utils.helper";
import { FinalUsersPropertiesEnum } from "src/app/shared/utils/enums/final-users-properties.enum";
import { isNullOrUndefined } from "@swimlane/ngx-datatable";
import { CardTypeEnum } from "src/app/shared/utils/enums/card-type.enum";
import { CycleContinuousOccurrenceModel } from "src/app/shared/models/cycle-continuous-occurrence.model";
import { CycleContinuousOccurrenceEnum } from "src/app/shared/utils/enums/cycle-continuous-occurrence.enum";
import { UnconfirmedEmailModel } from "src/app/shared/models/unconfirmed-email-model";
import { Position } from "src/app/shared/models/cycle-overview.model";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  @ViewChild("meuCanvas", { static: true }) elemento: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  public occupationAreaForm: FormGroup;
  public activeTab: boolean;
  public paginaAtual = 1;
  public cardDataHeader: CardDataModel;
  public cardCycleDetails: CardDataModel;
  public cardDataCycleTime: CardDataModel;
  public cardDataTrails: CardDataModel;
  public cardDataUseContinuosCycle: CardDataModel;
  public cardCyclesOverview: Position[] = [];

  public loadingOccupationArea: boolean;
  public loadingUncofirmedEmail: boolean;
  public dropdownSettings: IDropdownSettings = {};
  public modalRef: NgbModalRef;
  public mdbTableStriped: boolean = true;
  public stripeCode: string;
  public filterModalData: FilterModalModel;
  public selectedTab: FinalUsersStatusEnum;
  public selectedAssessmentTab: FinalUsersStatusEnum;
  public finalUsersStatusEnum = FinalUsersStatusEnum;
  public finalUsersPropertiesEnum = FinalUsersPropertiesEnum;
  public userHelper = UserHelper;
  public showUsers: boolean;
  public utilsHelper = UtilsHelper;
  public cycles = [];
  public numberTimes = [];
  public unconfirmedEmail = [];
  public filteredUnconfirmedEmail = [];

  public cardDataTypeEnumLocal = CardDataTypeEnumLocal;
  public UsersTableHeadEnumLocal = UsersTableHeadEnumLocal;

  public usersList: FinalUsersModel[] = [];
  private usersListBackup: FinalUsersModel[] = [];
  public usersTabList: FinalUsersModel[] = [];

  public assessmentList: AssessmentModel[] = [];
  private assessmentListBackup: AssessmentModel[] = [];
  public assessmentTabList: AssessmentModel[] = [];
  public selectedFilter: FinalUsersPropertiesEnum;

  public isLoadingDocs: boolean = false;

  public professionalTableTabRegister: boolean;

  public hideOptions: any[] = [CardTypeEnum.Totais, CardTypeEnum.Anual];

  public headUserElements = [
    {
      description: "Último acesso",
      visible: true,
      type: UsersTableHeadEnumLocal.LastAccess,
      icon: '<i class="icon-exchange-vertical"></i>',
    },
    {
      description: "Nome",
      visible: true,
      type: UsersTableHeadEnumLocal.Name,
      icon: '<i class="icon-exchange-vertical"></i>',
    },
    {
      description: "Status",
      visible: true,
      type: UsersTableHeadEnumLocal.Status,
      icon: '<i class="icon-exchange-vertical"></i>',
    },
    {
      description: "Filtro: Ciclo Atual",
      visible: true,
      type: UsersTableHeadEnumLocal.Filter,
      icon: '<i class="icon-exchange-vertical"></i>',
    },
    {
      description: "Filtro",
      visible: true,
      type: UsersTableHeadEnumLocal.BtnFilter,
      icon: '<i class="icon-filter"></i>',
    },
  ];

  public headAssessmentElements = [
    {
      description: "Data de solicitação",
      visible: true,
      type: UsersTableHeadEnumLocal.LastAccess,
      icon: '<i class="icon-exchange-vertical"></i>',
    },
    {
      description: "Usuário",
      visible: true,
      type: UsersTableHeadEnumLocal.Name,
      icon: '<i class="icon-exchange-vertical"></i>',
    },
    {
      description: "E-mail",
      visible: true,
      type: UsersTableHeadEnumLocal.Status,
      icon: '<i class="icon-exchange-vertical"></i>',
    },
    {
      description: "",
      visible: true,
      type: UsersTableHeadEnumLocal.Filter,
      icon: "",
    },
  ];

  public allColors = [
    "#4d6af6",
    "#ff7070",
    "#3cc8b4",
    "#6D35CC",
    "#F2C94C",
    "#ff70f8",
  ];
  public usedColors = [];

  // Drag and Scroll
  public owlcarouselOptions: any;
  public innerWidth: any;
  public owlCarouselMinimalSize = 768;

  public tabUserHeaders: any[];
  public tabAssessmentHeaders: any[];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public toster: ToastrService,
    private modalService: NgbModal
  ) {
    this.cardCycleDetails = new CardDataModel();
    this.cardDataCycleTime = new CardDataModel();
    this.cardDataTrails = new CardDataModel();
    this.cardDataUseContinuosCycle = new CardDataModel();
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

    this.selectedFilter = FinalUsersPropertiesEnum.currentCycle;
  }

  async ngOnInit() {
    this.checkScreenSize();
    this.cycles = await this.userService.getCycles().toPromise();
    this.getNumberTimesTexts();
    this.settabUserHeaders();
    this.settabAssessmentHeaders();
    this.getAllAssessments();
    this.getAllUsers();
    this.getUnconfirmedEmail();
  }

  getUnconfirmedEmail() {
    this.loadingUncofirmedEmail = true;
    this.userService
      .getUnconfirmedEmail()
      .toPromise()
      .then((res: UnconfirmedEmailModel[]) => {
        this.unconfirmedEmail = res.map((r) => ({ ...r, collapsed: false }));
        this.transform();
        this.loadingUncofirmedEmail = false;
      })
      .catch((err) => {
        console.log(err);
        this.loadingUncofirmedEmail = false;
      });
  }

  filterUnconfirmedEmail(event) {
    this.transform(event.target.value);
  }

  getNumberTimesTexts() {
    let nTimes1 = new CycleContinuousOccurrenceModel(
      CycleContinuousOccurrenceEnum.Once
    );
    this.numberTimes.push(nTimes1);
    let nTimes2 = new CycleContinuousOccurrenceModel(
      CycleContinuousOccurrenceEnum.MoreThenOne
    );
    this.numberTimes.push(nTimes2);
  }

  private settabUserHeaders() {
    this.tabUserHeaders = [];
    this.tabUserHeaders.push({
      description: "Cadastrados",
      type: FinalUsersStatusEnum.All,
      active: true,
      counter: 0,
    });
    this.tabUserHeaders.push({
      description: "Ativos",
      type: FinalUsersStatusEnum.Active,
      active: false,
      counter: 0,
    });
    this.tabUserHeaders.push({
      description: "Inativos",
      type: FinalUsersStatusEnum.Inactive,
      active: false,
      counter: 0,
    });
    this.tabUserHeaders.push({
      description: "Bloqueados",
      type: FinalUsersStatusEnum.Blocked,
      active: false,
      counter: 0,
    });
  }

  private settabAssessmentHeaders() {
    this.tabAssessmentHeaders = [];
    this.tabAssessmentHeaders.push({
      description: "Pendentes",
      type: FinalUsersStatusEnum.Inactive,
      active: true,
      counter: 0,
    });
    this.tabAssessmentHeaders.push({
      description: "Enviados",
      type: FinalUsersStatusEnum.Active,
      active: false,
      counter: 0,
    });
  }

  private async getAllUsers() {
    this.usersList = [];
    await this.userService
      .getAllFinalUsers()
      .toPromise()
      .then((res) => {
        this.usersList = res;
        this.usersList.map((p) => {
          p.lastAccess = DateHelper.formatDate(
            p.lastAccess,
            "dd/MM/yyyy - HH:MM"
          );
          p.creationDate = DateHelper.formatDate(
            p.creationDate,
            "dd/MM/yyyy - HH:MM"
          );
        });
      });

    this.setTabUserCounters();

    this.selectedTab = FinalUsersStatusEnum.All;
    this.tabUserHeaders.map((t) =>
      t.type == FinalUsersStatusEnum.All
        ? (t.active = true)
        : (t.active = false)
    );
    this.usersListBackup = this.usersList;
    this.usersTabList = this.usersList;
  }

  async getAllAssessments() {
    this.assessmentList = [];
    this.assessmentListBackup = [];
    await this.userService
      .getAssessements()
      .toPromise()
      .then((res) => {
        this.assessmentListBackup = res;
        this.assessmentListBackup.map((p) => {
          p.requestDate = DateHelper.formatDate(
            p.requestDate,
            "dd/MM/yyyy - HH:MM"
          );
        });
        this.assessmentList = this.assessmentListBackup.filter((a) =>
          isNullOrUndefined(a.url)
        );
      });
    this.assessmentTabList = this.assessmentList;
    this.setTabAssessmentCounters();
  }

  updateUserFilter(event) {
    this.usersList = [];
    if (event && event.target.value && event.target.value != "") {
      const val = event.target.value.toLowerCase();

      const temp = this.usersTabList.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });

      this.usersList = temp;
    } else {
      this.usersList = this.usersTabList;
    }
  }

  updateAssessmentFilter(event) {
    this.assessmentList = [];
    if (event && event.target.value && event.target.value != "") {
      const val = event.target.value.toLowerCase();

      const temp = this.assessmentTabList.filter(function (d) {
        return d.username.toLowerCase().indexOf(val) !== -1 || !val;
      });

      this.assessmentList = temp;
    } else {
      this.assessmentList = this.assessmentTabList;
    }
  }

  getNewColor() {
    let randomColor = this.allColors[
      Math.floor(Math.random() * this.allColors.length)
    ];
    if (this.usedColors.includes(randomColor)) {
      return this.getNewColor();
    }
    this.usedColors.push(randomColor);
    return randomColor;
  }

  async updateChart(
    requestModel: RequestModel,
    cardType: CardDataTypeEnumLocal
  ) {
    switch (cardType) {
      case CardDataTypeEnumLocal.Header:
        this.cardDataHeader = await this.userService
          .getActiveInative(requestModel)
          .toPromise();
        this.cardDataHeader.cardTitle = "Ativos";
        break;
      case CardDataTypeEnumLocal.CycleDetails:
        this.cardCycleDetails = await this.userService
          .getCycleDetails(requestModel)
          .toPromise();
        this.cardCycleDetails.cardTitle = "Ciclo";
        break;
      case CardDataTypeEnumLocal.CyclesOverview:
        this.getCyclesOverview(requestModel);
        break;
      case CardDataTypeEnumLocal.CycleTime:
        this.cardDataCycleTime = await this.userService
          .getCycleTime(requestModel)
          .toPromise();
        this.cardDataCycleTime.cardTitle = "Tempo de ciclo";
        break;
      case CardDataTypeEnumLocal.Trails:
        this.cardDataTrails = await this.userService
          .getTrails(requestModel)
          .toPromise();
        this.cardDataTrails.cardTitle = "Trilhas";
        break;
      case CardDataTypeEnumLocal.UseContinuosCycle:
        this.cardDataUseContinuosCycle = await this.userService
          .getUseContinuosCycle(requestModel)
          .toPromise();
        this.cardDataUseContinuosCycle.cardTitle = "Uso de ciclo contínuo";
        break;
    }
  }

  getCyclesOverview(requestModel) {
    this.usedColors = [];
    this.userService.getCyclesOverview(requestModel).subscribe((res) => {
      this.cardCyclesOverview = res.cycles.map((pos) => {
        return {
          ...pos,
          isVisible: true,
          color: this.getNewColor(),
        };
      });
    });
  }

  public chartClicked(e: any): void { }

  public chartHovered(e: any): void { }

  public activeTabChanged(tab: any) {
    this.tabUserHeaders.map((x) =>
      x.type != tab.type ? (x.active = false) : (x.active = true)
    );
    this.selectedTab = tab.type;
    if (tab.type != FinalUsersStatusEnum.All) {
      this.usersList = this.usersListBackup.filter((p) => p.status == tab.type);
      this.headUserElements.map((h) =>
        h.description == "Status" ? (h.visible = false) : h.visible
      );
    } else {
      this.usersList = this.usersListBackup;
      this.headUserElements.map((h) => (h.visible = true));
    }
    this.usersTabList = this.usersList;
  }

  activeAssessmentTabChanged(tab: any) {
    this.tabAssessmentHeaders.map((x) =>
      x.type != tab.type ? (x.active = false) : (x.active = true)
    );
    this.selectedAssessmentTab = tab.type;
    if (tab.type == FinalUsersStatusEnum.Inactive) {
      this.assessmentList = this.assessmentListBackup.filter((p) =>
        isNullOrUndefined(p.url)
      );
    } else {
      this.assessmentList = this.assessmentListBackup.filter(
        (p) => !isNullOrUndefined(p.url)
      );
    }
    this.assessmentTabList = this.assessmentList;
  }

  public orderTableByHead(head) {
    switch (head) {
      case UsersTableHeadEnumLocal.LastAccess:
        this.orderTableByData();
        break;
      case UsersTableHeadEnumLocal.Name:
        this.orderTableByProfissional();
        break;
      case UsersTableHeadEnumLocal.Status:
        this.orderTableByStatus();
        break;
      case UsersTableHeadEnumLocal.Filter:
        this.orderTableBySelectedFilter();
        break;
      case UsersTableHeadEnumLocal.BtnFilter:
        this.openFilterModal();
        break;
    }
  }

  openFilterModal() {
    let modalData: FilterModalModel[] = [];

    const propertiesEnum = Object.keys(FinalUsersPropertiesEnum).filter((key) =>
      isNaN(Number(FinalUsersPropertiesEnum[key]))
    );
    const propertiesEnumText = propertiesEnum.map((ex) =>
      this.userHelper.getFinalUsersPropertiesDescripion(Number(ex))
    );

    for (let index = 0; index < propertiesEnumText.length; index++) {
      modalData.push({
        description: propertiesEnumText[index],
        filterList: [],
        selected: false,
        type: index,
      });
    }

    if (this.filterModalData) {
      modalData.map((m) =>
        m.description == this.filterModalData.description
          ? (m.selected = this.filterModalData.selected)
          : false
      );
    }

    this.modalRef = this.modalService.open(FilterModalComponent, {
      windowClass: "modal-filter",
    });
    this.modalRef.componentInstance.modalData = modalData;
    this.modalRef.result.then((result) => {
      if (result) {
        if (!result.cancel) {
          this.headUserElements.map(
            (th) =>
            (th.description =
              th.type == UsersTableHeadEnumLocal.Filter
                ? `${"Filtro: " + result.description}`
                : th.description)
          );
          this.selectedFilter = result.type;
          this.filterModalData = result;
          this.orderTableBySelectedFilter();
        }
      } else {
        this.selectedFilter = FinalUsersPropertiesEnum.currentCycle;
        this.headUserElements.map(
          (th) =>
          (th.description =
            th.type == UsersTableHeadEnumLocal.Filter
              ? "Filtro: Ciclo Atual"
              : th.description)
        );
        this.filterModalData = null;
        this.usersList = this.usersListBackup;
        this.setTabUserCounters();
      }
    });
  }

  setTabUserCounters() {
    this.tabUserHeaders.map(
      (tab) =>
      (tab.counter =
        tab.type == FinalUsersStatusEnum.All
          ? this.usersList.length
          : this.usersList.filter((p) => p.status == tab.type).length)
    );
  }

  setTabAssessmentCounters() {
    this.tabAssessmentHeaders.map(
      (tab) =>
      (tab.counter =
        tab.type == FinalUsersStatusEnum.Inactive
          ? this.assessmentList.length
          : this.assessmentListBackup.filter((p) => !isNullOrUndefined(p.url))
            .length)
    );
  }

  listOfFilters(listFilter: string[]): FilterModalModel[] {
    let newFilterList: FilterModalModel[] = [];
    listFilter.forEach((item) => {
      newFilterList.push({
        description: item,
        filterList: [],
        selected: false,
        type: FilterOptionEnumLocal.Specializations,
      });
    });
    return newFilterList;
  }

  orderTableByStatus() {
    this.usersList = this.usersListBackup.sort((a, b) =>
      a.status > b.status ? 1 : -1
    );
  }

  orderTableByProfissional() {
    this.usersList = this.usersListBackup.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
  }

  orderTableByData() {
    this.usersList = this.usersListBackup.sort((a, b) =>
      a.lastAccess > b.lastAccess ? 1 : -1
    );
  }

  orderTableBySelectedFilter() {
    switch (this.selectedFilter) {
      case FinalUsersPropertiesEnum.currentCycle:
        this.usersList = this.usersListBackup.sort((a, b) =>
          a.currentCycle > b.currentCycle ? 1 : -1
        );
        break;
      case FinalUsersPropertiesEnum.assessmentCounter:
        this.usersList = this.usersListBackup.sort((a, b) =>
          a.assessmentCounter > b.assessmentCounter ? 1 : -1
        );
        break;
      case FinalUsersPropertiesEnum.creationDate:
        this.usersList = this.usersListBackup.sort((a, b) =>
          a.creationDate > b.creationDate ? 1 : -1
        );
        break;
      case FinalUsersPropertiesEnum.doneCycleCounter:
        this.usersList = this.usersListBackup.sort((a, b) =>
          a.doneCycleCounter > b.doneCycleCounter ? 1 : -1
        );
        break;
      case FinalUsersPropertiesEnum.doneTaskCounter:
        this.usersList = this.usersListBackup.sort((a, b) =>
          a.doneTaskCounter > b.doneTaskCounter ? 1 : -1
        );
        break;
      case FinalUsersPropertiesEnum.sessionCounter:
        this.usersList = this.usersListBackup.sort((a, b) =>
          a.sessionCounter > b.sessionCounter ? 1 : -1
        );
        break;
      case FinalUsersPropertiesEnum.timePerCycle:
        this.usersList = this.usersListBackup.sort((a, b) =>
          a.timePerCycle > b.timePerCycle ? 1 : -1
        );
        break;
      case FinalUsersPropertiesEnum.totalSpentTime:
        this.usersList = this.usersListBackup.sort((a, b) =>
          a.totalSpentTime > b.totalSpentTime ? 1 : -1
        );
        break;
      case FinalUsersPropertiesEnum.trailName:
        this.usersList = this.usersListBackup.sort((a, b) =>
          a.trailName > b.trailName ? 1 : -1
        );
        break;
    }
  }

  sendAssessmentLink(assessment: AssessmentModel) {
    this.userService
      .sendAssessmentLink(assessment.id, assessment.link)
      .toPromise()
      .then((res) => {
        if (res) {
          this.toster.success("Url enviada com sucesso!");
          this.getAllAssessments();
        }
      });
  }

  transform(filterText = "") {
    if (!this.unconfirmedEmail) {
      this.filteredUnconfirmedEmail = [];
      return;
    }
    if (!filterText) {
      this.filteredUnconfirmedEmail = this.unconfirmedEmail;
      return;
    }

    this.filteredUnconfirmedEmail = this.unconfirmedEmail.filter((user) => {
      return this.userContainsFilterText(user, filterText);
    });
  }

  private userContainsFilterText(user, filterText): boolean {
    filterText = filterText.toLocaleLowerCase();
    const filterTerms = filterText.split(" ");
    for (const filterTerm of filterTerms) {
      const hasFilterTerm = this.userContainsFilterTerm(user, filterTerm);
      if (hasFilterTerm === false) {
        return false;
      }
    }

    return true;
  }

  private userContainsFilterTerm(user, filterTerm: string) {
    return (
      user.name.toLocaleLowerCase().includes(filterTerm) ||
      user.email.toLocaleLowerCase().includes(filterTerm)
    );
  }

  resendEmail(user, event) {
    event.stopPropagation();
    this.userService
      .resendEmail(user.email)
      .toPromise()
      .then((res) => this.toster.success("Email reenviado com sucesso!"))
      .catch((res) => this.toster.error("Falha ao reenviar email!"));
  }

  checkScreenSize() {
    this.innerWidth = window.innerWidth;
  }
}

export enum CardDataTypeEnumLocal {
  Header,
  CycleDetails,
  CyclesOverview,
  CycleTime,
  Trails,
  UseContinuosCycle,
}

export enum UsersTableHeadEnumLocal {
  LastAccess,
  Name,
  Status,
  Filter,
  BtnFilter,
}

export enum FilterOptionEnumLocal {
  OccupationArea,
  Specializations,
  ExperienceTime,
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Chart } from "chart.js";
import { Cycle } from "../../domains/cycle.interface";
import { CardDataModel } from "../../models/card-data.model";
import { RequestModel } from "../../models/request-model";
import { CardDataHelper } from "../../utils/helpers/card-data.helper";
import { CycleContinuousOccurrenceModel } from "../../models/cycle-continuous-occurrence.model";
import { CycleContinuousOccurrenceEnum } from "../../utils/enums/cycle-continuous-occurrence.enum";

@Component({
  selector: "app-chart-card-small",
  templateUrl: "./chart-card-small.component.html",
  styleUrls: ["./chart-card-small.component.scss"],
})
export class ChartCardSmallComponent implements OnInit, OnChanges {

  private _cycles: Cycle[];
  public get cycles(): Cycle[] {
    return this._cycles;
  }
  @Input()
  public set cycles(v: Cycle[]) {
    this._cycles = v;
    this.selectedCycle = v[0]
  }

  @Input() cardData: CardDataModel;
  @Input() numberTimes: CycleContinuousOccurrenceModel[] = [];
  @Input() isInvoicing = false;
  @Input() isCycleTime = false;
  @Input() hideOptions: any[] = [];
  @Output() rangeChange: EventEmitter<any> = new EventEmitter();
  @ViewChild("lineChart", { static: true }) chart: ElementRef;

  public descriptionTitleLabel: string;
  public titleLabelValue: number;
  public lineGraphData: any;
  public lineGraphLabels: string[];
  public chartOptions = {};
  public loading: boolean;
  public selectedCycle: Cycle;
  public selectedNumberTimes: CycleContinuousOccurrenceModel;
  public showDropdown = false;
  public requestData: RequestModel;

  constructor() {
    this.loading = true;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cardData) {
      this.loadChart();
    }
    if (!this.selectedNumberTimes && this.numberTimes[0]) {
      this.selectedNumberTimes = this.numberTimes[0];
    }
  }

  private async loadChart() {
    this.loading = true;
    await this.setLineGraphData().then((res) => {
      this.lineGraphData = res;
      this.setChartValues();
    });
  }

  emitRange(requestData: RequestModel) {
    this.requestData = requestData;
    this.loading = true;
    if (this.selectedCycle) {
      requestData.cycleId = this.selectedCycle.id;
    }

    if (this.selectedNumberTimes) {
      requestData.ocurrence = this.selectedNumberTimes.ocurrence;
    }
    else {
      requestData.ocurrence = CycleContinuousOccurrenceEnum.Once;
    }
    this.rangeChange.emit(requestData);
    this.setLineGraphData();
  }

  private setLineGraphData(): Promise<any> {
    return new Promise<any>((resolve) => {
      resolve(CardDataHelper.getChartData(this.cardData.chart));
    });
  }

  setChartValues() {
    new Chart(
      this.chart.nativeElement,
      CardDataHelper.setChartData(
        this.lineGraphData,
        this.requestData.chartRange
      )
    );
    this.loading = false;
  }

  getTitleAsId() {
    return this.cardData.cardTitle.toLowerCase().replace(" ", "-");
  }

  selectCycle(cycle) {
    this.showDropdown = false;
    this.selectedCycle = cycle;
    let requestData = this.requestData;
    requestData.cycleId = cycle.id;
    this.emitRange(requestData);
  }

  selectNumberTimes(cycleContinuousOccurrence: CycleContinuousOccurrenceModel) {
    this.showDropdown = false;
    this.selectedNumberTimes = cycleContinuousOccurrence;
    let requestData = this.requestData;
    requestData.ocurrence = cycleContinuousOccurrence.ocurrence;
    this.emitRange(requestData);
  }

  public chartClicked(e: any): void { }

  public chartHovered(e: any): void { }
}

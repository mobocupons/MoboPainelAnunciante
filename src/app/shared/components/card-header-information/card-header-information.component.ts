import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  resolveForwardRef,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import * as Chart from "chart.js";

import { CardDataModel } from "src/app/shared/models/card-data.model";
import { RequestModel } from "../../models/request-model";
import { CardTypeEnum } from "../../utils/enums/card-type.enum";
import { CardDataHelper } from "../../utils/helpers/card-data.helper";

@Component({
  selector: "app-card-header-information",
  templateUrl: "./card-header-information.component.html",
  styleUrls: ["./card-header-information.component.scss"],
})
export class CardHeaderInformationComponent implements OnInit, OnChanges {
  @Output() rangeChange: EventEmitter<any> = new EventEmitter();
  @Input() cardData: CardDataModel;
  @ViewChild("lineChart", { static: true }) chart: ElementRef;

  public lineGraphData: any;
  public lineGraphLabels: string[];
  public lineGraphOptions: any;
  public loading: boolean;
  public chartRange: CardTypeEnum;

  constructor() {
    this.cardData = new CardDataModel();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cardData) {
      this.loadChart();
    }
  }

  private async loadChart() {
    this.loading = true;
    await this.setLineGraphData().then((res) => {
      this.lineGraphData = res;
      this.setChartValues();
    });
  }

  async emitRange(requestData: RequestModel) {
    this.chartRange = requestData.chartRange;
    this.loading = true;
    this.rangeChange.emit(requestData);
  }

  private setLineGraphData(): Promise<any> {
    return new Promise<any>((resolve) => {
      if (this.cardData && this.cardData.chart) {
        resolve(CardDataHelper.getChartData(this.cardData.chart));
      } else {
        resolve([]);
      }
    });
  }

  async setChartValues() {
    new Chart(
      this.chart.nativeElement,
      CardDataHelper.setChartData(this.lineGraphData, this.chartRange)
    );
    this.loading = false;
  }
}

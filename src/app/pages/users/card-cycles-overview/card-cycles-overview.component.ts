import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { CardTypeEnum } from "src/app/shared/utils/enums/card-type.enum";
import { ptBR } from "date-fns/locale";
import * as Chart from "chart.js";
import * as dateFns from "date-fns";
import { Position } from "src/app/shared/models/cycle-overview.model";

@Component({
  selector: "app-card-cycles-overview",
  templateUrl: "./card-cycles-overview.component.html",
  styleUrls: ["./card-cycles-overview.component.scss"],
})
export class CardCyclesOverviewComponent implements OnInit {
  @ViewChild("lineChart", { static: true }) chart: ElementRef;
  @Output() rangeChange: EventEmitter<any> = new EventEmitter();

  private _cardCyclesOverview: Position[];
  public get cardCyclesOverview(): Position[] {
    return this._cardCyclesOverview;
  }
  @Input()
  public set cardCyclesOverview(v: Position[]) {
    this._cardCyclesOverview = v;
    this.setLineGraphData();
  }

  public datasetSelectors = [];
  public lineGraphOptions = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          display: false,
        },
      ],
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  public loading: boolean;
  public requestData = {
    chartRange: 2,
  };

  constructor() { }

  ngOnInit(): void {
    this.loading = true;
  }

  setLineGraphData() {
    this.loading = true;
    this.setLabels();
    this.setChartValues();
  }

  setLabels() {
    this.datasetSelectors = this.cardCyclesOverview.map((cd) => {
      return {
        id: cd.label.toLowerCase().replace(" ", "-"),
        label: cd.label,
        color: cd.color,
        isVisible: cd.isVisible,
      };
    });
  }

  setChartValues() {
    new Chart(
      this.chart.nativeElement,
      this.setChartData(this.cardCyclesOverview, this.requestData.chartRange)
    );
    this.loading = false;
  }

  emitRange(requestData) {
    this.loading = true;
    this.requestData = requestData;
    this.rangeChange.emit(requestData);
  }

  toggleActive(dataset) {
    let chartPosition = this.cardCyclesOverview.find(
      (cd) => cd.label == dataset.label
    );
    chartPosition.isVisible = !chartPosition.isVisible;
    dataset.isVisible = !dataset.isVisible;
    this.setChartValues();
  }

  setChartData(dataChart, cardRange = CardTypeEnum.Mensal) {
    let datasets = dataChart
      .filter((dc) => dc.isVisible)
      .map((dc) => {
        return {
          data: dc.chart.map((c) => c.value),
          borderColor: dc.color,
          borderWidth: 1,
          fill: false,
        };
      });

    return {
      type: "line",
      data: {
        labels: [...this.getLabels(dataChart, cardRange)],
        datasets,
      },
      options: this.lineGraphOptions,
    };
  }

  getLabels(dataChart, dateRangeType) {
    let labels = new Set([]);

    for (let dc of dataChart) {
      for (let chart of dc.chart) {
        let startDate = new Date(chart.startDate);
        let label = this.getFormatedLabel(startDate, dateRangeType);
        labels = new Set([...labels, label]); //Garante labels únicos
      }
    }

    return labels;
  }

  getFormatedLabel(startDate, dateRangeType) {
    startDate = dateFns.addDays(startDate, 1);
    let label = "";
    let formated = "";

    switch (dateRangeType) {
      case CardTypeEnum.Anual:
        formated = dateFns.format(startDate, "MMM/yy", { locale: ptBR });
        label = `${formated}`;
        break;

      case CardTypeEnum.Mensal:
        let dayOfMonth = dateFns.format(startDate, "d");
        label = `Sem ${Math.floor(+dayOfMonth / 7) + 1}`;
        break;

      case CardTypeEnum.Semanal:
        formated = dateFns.format(startDate, "dd/MM");
        label = `${formated}`;
        break;

      case CardTypeEnum.Totais:
        formated = dateFns.format(startDate, "MMM/yy", { locale: ptBR });
        label = `${formated}`;
        break;
    }
    return label;
  }
}

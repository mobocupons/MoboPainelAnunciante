import { DataChartModel } from "./data-chart.model";
export class CardDataModel {
  public cardTitle?: string;
  public firstLabel: string;
  public firstValue: number;
  public secondLabel: string;
  public secondValue: string;
  public thirdLabel: string;
  public thirdValue: string;
  public chart: DataChartModel[];

  constructor() {
    this.chart = [];
  }
}

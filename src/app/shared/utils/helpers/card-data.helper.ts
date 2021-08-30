import { DataChartModel } from "../../models/data-chart.model";
import { CardTypeEnum } from "../enums/card-type.enum";
import * as dateFns from "date-fns";
import { ptBR } from "date-fns/locale";

export module CardDataHelper {
  export function getChartData(chartData: DataChartModel[]): Array<DataChartModel> {
    let listDataChart: DataChartModel[] = [];
    chartData.forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (!listDataChart[key]) {
          listDataChart[key] = [];
        }
        listDataChart[key].push(value);
      });
    });
    return listDataChart;
  }

  export function setChartData(dataChart, cardRange = CardTypeEnum.Mensal) {

    let lineGraphOptions = {
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
    return {
      type: "line",
      data: {
        labels: getLabels(dataChart, cardRange),
        datasets: [
          {
            // Azul
            data: chartData(dataChart["firstValue"]),
            borderColor: "#4d6af6",
            borderWidth: 1,
            fill: false,
          },
          {
            //Verde
            data: chartData(dataChart["secondValue"]),
            borderColor: "#3cc8b4",
            borderWidth: 1,
            fill: false,
          },
          {
            // Vermelho
            data: chartData(dataChart["thirdValue"]),
            borderColor: "#ff7070",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: lineGraphOptions,
    };
  }

  function chartData(dataChart = []) {
    dataChart.map(x => x = +x.replace(',', '.'));
    return (dataChart && dataChart.reduce((a, b) => a + b, 0)) > 0 ? dataChart : [];

  }

  function getLabels(dataChart, dateRangeType) {
    let startDates = dataChart['startDate'];
    let labels = [];

    if (startDates && startDates[0]) {
      for (let sd of startDates) {
        let startDate = new Date(sd)
        let label = getFormatedLabel(startDate, dateRangeType);
        labels.push(label);
      }
    }

    return labels;
  }

  function getFormatedLabel(startDate, dateRangeType) {
    startDate = dateFns.addDays(startDate, 1)
    let label = "";
    let formated = "";

    switch (dateRangeType) {
      case CardTypeEnum.Anual:
        formated = dateFns.format(startDate, "MMM/yy", { locale: ptBR });
        label = `${formated}`;
        break;

      case CardTypeEnum.Mensal:
        let dayOfMonth = +dateFns.format(startDate, "d");
        label = `Sem ${Math.floor(dayOfMonth / 7) + 1}`;
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

  export function getOwlcarouselOptions() {
    return {
      stagePadding: 120,
      items: 2,
      margin: 46,
      nav: false,
      dots: false,
      responsive: {
        576: {
          items: 1,
          mergeFit: true,
        },
        768: {
          items: 2,
          mergeFit: true,
        },
        992: {
          mergeFit: true,
        },
      },
    };
  }
}

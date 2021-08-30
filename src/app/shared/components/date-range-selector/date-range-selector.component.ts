import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { CardTypeEnum } from "../../utils/enums/card-type.enum";
import * as dateFns from "date-fns";
import { ptBR } from "date-fns/locale";

@Component({
  selector: "app-date-range-selector",
  templateUrl: "./date-range-selector.component.html",
  styleUrls: ["./date-range-selector.component.scss"],
})
export class DateRangeSelectorComponent implements OnInit {
  @Input() class = "";
  @Input() hideOptions: any[] = [];
  @Output() rangeChange: EventEmitter<any> = new EventEmitter();

  public ranges = [
    {
      name: "Totais",
      enumType: CardTypeEnum.Totais,
      isActive: false,
      startOfRange: (e) => null,
      isHidden: false
    },
    {
      name: "Anual",
      enumType: CardTypeEnum.Anual,
      isActive: false,
      startOfRange: dateFns.startOfYear,
      isHidden: false
    },
    {
      name: "Mensal",
      enumType: CardTypeEnum.Mensal,
      isActive: true,
      startOfRange: dateFns.startOfMonth,
      isHidden: false
    },
    {
      name: "Semanal",
      enumType: CardTypeEnum.Semanal,
      isActive: false,
      startOfRange: dateFns.startOfWeek,
      isHidden: false
    },
  ];
  public activeRange = this.ranges.find((range) => range.isActive);
  public finalDate = new Date();
  public isNextDisabled = true;
  public rangeLabel;
  public standardFormat = "yyyy-MM-dd'T'HH:mm:ssXXX";

  constructor() {
  }

  ngOnInit(): void {
    this.handleRangeDate();
    if (this.hideOptions) {
      this.ranges.map(r => r.isHidden = this.hideOptions.includes(r.enumType));
    }
  }

  handleRangeDate() {
    let maxDate = this.finalDate;
    let minDate = this.activeRange.startOfRange(this.finalDate);

    switch (this.activeRange.enumType) {
      case CardTypeEnum.Totais:
        this.handleAllRange();
        break;

      case CardTypeEnum.Anual:
        this.handleYearlyRange(maxDate, minDate);
        break;

      case CardTypeEnum.Mensal:
        this.handleMonthlyRange(maxDate, minDate);
        break;

      case CardTypeEnum.Semanal:
        this.handleWeeklyRange(maxDate, minDate);
        break;
    }
  }

  emitRange(output) {
    this.rangeChange.emit(output);
  }

  setActive(range) {
    this.activeRange = range;
    this.finalDate = new Date();
    this.isNextDisabled = true;

    this.ranges = this.ranges.map((r) => {
      r.isActive = r.enumType == range.enumType;
      return r;
    });
    this.handleRangeDate();
  }

  handleAllRange() {
    this.rangeLabel = null;
    this.emitRange({ chartRange: CardTypeEnum.Totais });
  }

  handleYearlyRange(maxDate, minDate) {
    let max = dateFns.format(maxDate, "yyyy");
    this.rangeLabel = `${max}`;

    let chartRange = CardTypeEnum.Anual;
    let startDate = dateFns.format(
      dateFns.startOfDay(minDate),
      this.standardFormat
    ).replace(/:/g, "%3A");
    let endDate = dateFns.format(
      dateFns.endOfDay(maxDate),
      this.standardFormat
    ).replace(/:/g, "%3A");
    this.emitRange({ startDate, endDate, chartRange });
  }

  handleMonthlyRange(maxDate, minDate) {
    let max = dateFns.format(maxDate, "MMMM yyyy", { locale: ptBR });
    this.rangeLabel = `${max}`;

    let chartRange = CardTypeEnum.Mensal;
    let startDate = dateFns.format(
      dateFns.startOfDay(minDate),
      this.standardFormat
    ).replace(/:/g, "%3A");
    let endDate = dateFns.format(
      dateFns.endOfDay(maxDate),
      this.standardFormat
    ).replace(/:/g, "%3A");
    this.emitRange({ startDate, endDate, chartRange });
  }

  handleWeeklyRange(maxDate, minDate) {
    let max = dateFns.format(maxDate, "dd/MM");
    let min = dateFns.format(minDate, "dd/MM");
    this.rangeLabel = `${min} - ${max}`;

    let chartRange = CardTypeEnum.Semanal;
    let startDate = dateFns.format(
      dateFns.startOfDay(minDate),
      this.standardFormat
    ).replace(/:/g, "%3A");
    let endDate = dateFns.format(
      dateFns.endOfDay(maxDate),
      this.standardFormat
    ).replace(/:/g, "%3A");
    this.emitRange({ startDate, endDate, chartRange });
  }

  prev() {
    this.isNextDisabled = false;
    switch (this.activeRange.enumType) {
      case CardTypeEnum.Anual:
        this.finalDate = dateFns.endOfYear(dateFns.subYears(this.finalDate, 1));
        break;
      case CardTypeEnum.Mensal:
        this.finalDate = dateFns.endOfMonth(
          dateFns.subMonths(this.finalDate, 1)
        );
        break;
      case CardTypeEnum.Semanal:
        this.finalDate = dateFns.endOfWeek(dateFns.subWeeks(this.finalDate, 1));
        break;
    }

    this.handleRangeDate();
  }

  next() {
    switch (this.activeRange.enumType) {
      case CardTypeEnum.Anual:
        this.finalDate = dateFns.endOfYear(dateFns.addYears(this.finalDate, 1));
        break;
      case CardTypeEnum.Mensal:
        this.finalDate = dateFns.endOfMonth(
          dateFns.addMonths(this.finalDate, 1)
        );
        break;
      case CardTypeEnum.Semanal:
        this.finalDate = dateFns.endOfWeek(dateFns.addWeeks(this.finalDate, 1));
        break;
    }


    if (dateFns.isFuture(this.finalDate)) {
      this.finalDate = new Date();
      this.isNextDisabled = true;
    }

    this.handleRangeDate();
  }
}

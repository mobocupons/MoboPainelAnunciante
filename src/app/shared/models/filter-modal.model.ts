export class FilterModalModel {
  public description?: string;
  public filterList?: FilterModalModel[];
  public selected?: boolean;
  public type?: any;

  constructor() {
    this.filterList = [];
  }
}

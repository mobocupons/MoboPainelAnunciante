import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { FilterModalModel } from 'src/app/shared/models/filter-modal.model';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {
  @Input() modalData: FilterModalModel[] = [];

  public filterTypeList: FilterModalModel[] = [];

  public filterBy: any;
  public filterTypes: any[] = [];

  constructor(public activeModal: NgbActiveModal) {
  }


  ngOnInit() {
    if (this.modalData && this.modalData.some(md => md.selected)) {
      this.setFilter(this.modalData.find(md => md.selected));
    }
  }

  setFilter(optionFilter: FilterModalModel) {
    console.log("optionFilter", optionFilter);
    this.modalData.map(md => md.selected = (md.description == optionFilter.description));
    this.filterTypeList = optionFilter.filterList;
    this.filterBy = optionFilter.type;
    this.filterTypes = optionFilter.filterList.filter(ft => ft.selected);
  }

  setTypeFilter(typeFilter: FilterModalModel) {
    typeFilter.selected = !typeFilter.selected;
    if (this.filterTypes.some(ft => ft.description == typeFilter.description)) {
      this.filterTypes = this.filterTypes.filter(t => t.description != typeFilter.description);
    }
    else {
      this.filterTypes.push(typeFilter);
    }
  }

  clearFilters() {
    this.modalData.map(md => {
      md.selected = false;
      md.filterList.map(fl => fl.selected = false);
    });
    this.onResult(true);
  }

  onClose() {
    this.activeModal.close({ cancel: true });
  }

  onDismiss() {
    this.activeModal.dismiss({ cancel: true });
  }

  onResult(cleared: boolean = false) {
    let filter: FilterModalModel = null;
    if (!cleared) {
      let selectedFilter = this.modalData.find(f => f.selected);
      filter = {
        description: selectedFilter.description,
        filterList: this.filterTypes,
        selected: true,
        type: this.filterBy
      }
    }
    this.activeModal.close(filter);
  }

  okToClick() {
    return isNullOrUndefined(this.filterBy) && this.filterTypes.length <= 0;
  }
}

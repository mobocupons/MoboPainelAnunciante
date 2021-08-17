import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DocsModalComponent } from './docs-modal/docs-modal.component';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [OrdersComponent, DocsModalComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    CarouselModule,
    SharedModule,
    NgxDatatableModule,
    ChartsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [DocsModalComponent]
})

export class OrdersModule { }

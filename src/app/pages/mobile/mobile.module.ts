import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { MobileComponent } from './mobile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FeatherIconsComponent } from 'src/app/shared/components/feather-icons/feather-icons.component';



@NgModule({
  declarations: [
    MobileComponent
  ],
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
  ]
})
export class MobileModule {
}

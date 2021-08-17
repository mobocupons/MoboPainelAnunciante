import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentLayoutComponent } from './components/layout/content-layout/content-layout.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

// services
import { NavService } from "./services/nav.service";
import { BaseService } from "./services/base.service";

// Directives
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { LoaderComponent } from './components/loader/loader.component';
import { CardHeaderInformationComponent } from './components/card-header-information/card-header-information.component';
import { ChartCardSmallComponent } from './components/chart-card-small/chart-card-small.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { DateRangeSelectorComponent } from './components/date-range-selector/date-range-selector.component';
import { PhonePipe } from './utils/pipes/phone-pipe/phone.pipe';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    ContentLayoutComponent,
    FeatherIconsComponent,
    BreadcrumbComponent,
    ToggleFullscreenDirective,
    LoaderComponent,
    CardHeaderInformationComponent,
    ChartCardSmallComponent,
    DateRangeSelectorComponent,
    PhonePipe,
    ConfirmationModalComponent,
    FilterModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    ChartsModule,
  ],
  exports: [
    FeatherIconsComponent,
    LoaderComponent,
    SidebarComponent,
    HeaderComponent,
    CardHeaderInformationComponent,
    ChartCardSmallComponent,
    DateRangeSelectorComponent,
    PhonePipe,
    ConfirmationModalComponent
  ],
  providers: [
    NavService,
    BaseService,
    NgbActiveModal
  ]
})
export class SharedModule { }


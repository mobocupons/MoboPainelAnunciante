import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";

import { AuthService } from "./shared/services/auth/auth.service";
import { AuthInterceptor } from "./shared/services/auth/auth.interceptor";

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageWrapperComponent } from './pages/page-wrapper/page-wrapper.component';
import { MobileModule } from './pages/mobile/mobile.module';
import { UsersModule } from './pages/users/users.module';
import { ProfessionalsModule } from './pages/professionals/professionals.module';
import { CouponsModule } from './pages/coupons/coupons.module';
import { OrdersModule } from './pages/orders/orders.module';
import { OrdersHistoryModule } from './pages/orders-history/orders-history.module';
import { FCMService } from './shared/services/fcm.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessaging, AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import {PhoneHelper} from "src/app/shared/helpers/phoneHelper"


@NgModule({
  declarations: [
    AppComponent,
    PageWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MobileModule,
    UsersModule,
    ProfessionalsModule,
    CouponsModule,
    OrdersModule,
    OrdersHistoryModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
    NgxPaginationModule,
  ],
  providers: [
    AuthService,
    FCMService,
    AsyncPipe,
    PhoneHelper,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

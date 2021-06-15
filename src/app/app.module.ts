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


@NgModule({
  declarations: [
    AppComponent,
    PageWrapperComponent
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
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

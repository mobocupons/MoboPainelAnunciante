import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersHistoryComponent } from './orders-history.component';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder } from '@angular/forms';
import { OrderService } from '../../shared/services/order.service';
import { BaseService } from '../../shared/services/base.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { PhoneHelper } from '../../shared/helpers/phoneHelper';

describe('OrdersHistoryComponent', () => {
  let component: OrdersHistoryComponent;
  let fixture: ComponentFixture<OrdersHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersHistoryComponent ],
      imports: [
        BrowserModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserModule,
        NgxPaginationModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersHistoryComponent);
    let fb = new FormBuilder;
    let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post']);
    let baseService: BaseService = new BaseService(httpClientSpy);
    let orderService =  new OrderService(baseService);
    let localStorageService= new LocalStorageService;
    let  phoneHelper= new  PhoneHelper;
    component = new OrdersHistoryComponent(fb,orderService,localStorageService,phoneHelper);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isThisSecond } from 'date-fns';
import { ValueCompleteOrder } from 'src/app/shared/models/complete-order.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import {OrderService} from "src/app/shared/services/order.service"
import {PhoneHelper} from "src/app/shared/helpers/phoneHelper"
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public couponsForm: FormGroup;
  public meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
  public accepetedOrders: ValueCompleteOrder[] = []
  public pendingOrders:ValueCompleteOrder[] = []

  selectedOrder: any
  
  constructor( private fb: FormBuilder,private orderService: OrderService,
    private localStorageService: LocalStorageService,
    public phoneHelper: PhoneHelper) {
    this.couponsForm = this.fb.group({
      name: ['', Validators.required],
      
    });
   }

  ngOnInit(): void {
    this.getDailyOrder()
  }

  selectOrder(code)
  {
    this.selectedOrder = this.pendingOrders.find(x=>x.id == code);
  }
  acceptOrder(code)
  {
    this.orderService.changeStatus(2,code).subscribe(item=>console.log(item),error=>console.log(error))
    this.accepetedOrders.push(this.pendingOrders.find(x=>x.id == code))
    this.selectOrder(code)
    this.pendingOrders = this.pendingOrders.filter(x=>x.id != code)
    
  }

  refuseOrder(code)
  {
    this.orderService.changeStatus(3,code).subscribe(item=>console.log(item),error=>console.log(error))
    this.pendingOrders = this.pendingOrders.filter(x=>x.id != code)
    
  }

  cancelOrder(code)
  {
    this.orderService.changeStatus(6,code).subscribe(item=>console.log(item),error=>console.log(error))
    this.accepetedOrders = this.accepetedOrders.filter(x=>x.id != code)
    
  }
  deliverOrder(code)
  {
    this.orderService.changeStatus(4,code).subscribe(item=>console.log(item),error=>console.log(error))
    this.accepetedOrders = this.accepetedOrders.filter(x=>x.id != code)
    
  }

  getDailyOrder(){
    let anunciante=  this.localStorageService.getAnunciante();
    let local=  this.localStorageService.getLocal();
    let localId = local!=null ? local.id : anunciante.locais[0].id;
    this.orderService.getAll(localId).subscribe(item=>{
      if(item){
        item.value.forEach(x=>{
          if(x.pedidoStatusId==1){
            this.pendingOrders.push(x)
          }
          else if(x.pedidoStatusId==2){
            this.accepetedOrders.push(x)
            this.selectedOrder = x
          }
        })
      }
      
    })
  }

  getDate(date){
    date = new Date(date);
    var newDate = ((date.getDate() + " " + this.meses[(date.getMonth())] + " " + date.getFullYear()))
    return newDate
  }

  getDateTime(date){
    date = new Date(date);
    var newDate = ((date.getDate() + " " + this.meses[(date.getMonth())] + " " + date.getFullYear()+ " as " + date.getHours()+ ":" + date.getMinutes()))
    return newDate
  }
  round(x){
    return Math.round(x).toFixed(2)
  }
}

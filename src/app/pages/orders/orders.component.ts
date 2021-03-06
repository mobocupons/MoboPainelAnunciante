import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isThisSecond } from 'date-fns';
import { ValueCompleteOrder } from 'src/app/shared/models/complete-order.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import {OrderService} from "src/app/shared/services/order.service"
import {PhoneHelper} from "src/app/shared/helpers/phoneHelper"
import { Constants } from 'src/app/shared/utils/constants';
import { EventEmitter }  from 'src/app/shared/helpers/EventeHelper';
import Swal from 'sweetalert2';

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
  public loadingCampain = true;

  selectedOrder: any
  
  constructor( private fb: FormBuilder,private orderService: OrderService,
    private localStorageService: LocalStorageService,
    public phoneHelper: PhoneHelper) {
    this.couponsForm = this.fb.group({
      name: ['', Validators.required],
      
    });
    this.eventListener()
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
    this.pendingOrders.forEach(x=>{
      if(x.id == code){
        x.pedidoStatusId = 2;
    }});
    this.accepetedOrders.unshift(this.pendingOrders.find(x=>x.id == code))
    this.selectOrder(code)
    this.pendingOrders = this.pendingOrders.filter(x=>x.id != code)
  }
  
  finalizeOrder(code)
  {
    this.orderService.changeStatus(5,code).subscribe(item=>console.log(item),error=>console.log(error))
    this.accepetedOrders = this.accepetedOrders.filter(x=>x.id != code)
    
  }

  refuseOrder(code)
  {
    Swal.fire({
      title: 'Recusar pedido?',
      text: 'O Cliente ser?? avisado que seu pedido foi recusado e n??o ser?? mais poss??vel atend??-lo',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Voltar`,
      denyButtonText: `Recusar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
       if (result.isDenied) {
        this.orderService.changeStatus(3,code).subscribe(item=>console.log(item),error=>console.log(error))
        this.pendingOrders = this.pendingOrders.filter(x=>x.id != code)
      }
    })    
  }

  cancelOrder(code)
  {
    this.orderService.changeStatus(6,code).subscribe(item=>console.log(item),error=>console.log(error))
    this.accepetedOrders = this.accepetedOrders.filter(x=>x.id != code)
    
  }
  deliverOrder(code)
  {
    this.orderService.changeStatus(4,code).subscribe(item=>console.log(item),error=>console.log(error))
    let order = this.accepetedOrders.find(x=>x.id == code)
    order.pedidoStatusId = 4;
    this.accepetedOrders = this.accepetedOrders.filter(x=>x.id != code)
    this.accepetedOrders =  this.accepetedOrders.concat(order);
  }

  getDailyOrder(){
    let anunciante=  this.localStorageService.getAnunciante();
    let local=  this.localStorageService.getLocal();
    let localId = local !=null ? local.id : anunciante.locais[0].id;
    this.orderService.getAll(localId).subscribe(item=>{
      this.loadingCampain = false;
      if(item){
        localStorage.setItem(Constants.ORDER, JSON.stringify(item));
        item.value.forEach(x=>{
          if(x.pedidoStatusId==1){
            this.pendingOrders.push(x)
          }
          else if(x.pedidoStatusId==2 || x.pedidoStatusId==4){
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

  eventListener(){
    EventEmitter.listen('newOrder', item => {
      if(item){
        localStorage.setItem(Constants.ORDER, JSON.stringify(item));
        this.pendingOrders = [];
        this.accepetedOrders= [];
        item.value.forEach(x=>{
          if(x.pedidoStatusId==1){
            this.pendingOrders.push(x)
          }
          else if(x.pedidoStatusId==2 || x.pedidoStatusId==4){
            this.accepetedOrders.push(x)
            this.selectedOrder = x
          }
        })
      }
    });
  }
}

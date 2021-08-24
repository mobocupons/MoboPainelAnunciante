import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneHelper } from 'src/app/shared/helpers/phoneHelper';
import { ValueCompleteOrder } from 'src/app/shared/models/complete-order.model';
import { Order } from 'src/app/shared/models/order.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})

export class OrdersHistoryComponent implements OnInit {
  pag : number = 1 ;
  contador : number = 10;
  public couponsForm: FormGroup;
  public searchForm: FormGroup;
  public orders: ValueCompleteOrder[] = []
  public oldOrders: ValueCompleteOrder[] = []
  public haveOrders: boolean = false
  public meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
  constructor( private fb: FormBuilder,private orderService: OrderService,
    private localStorageService: LocalStorageService,
    public phoneHelper: PhoneHelper) { 
    this.couponsForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.searchForm = this.fb.group({
      name: [''],
      date: [''],
    });
  }

  ngOnInit(): void {
    this.getOrders()
  }
getOrders()
{
  let anunciante=  this.localStorageService.getAnunciante();
    let local=  this.localStorageService.getLocal();
    let localId = local!=null ? local.id : anunciante.locais[0].id;
    this.orderService.getHistory(localId).subscribe(item=>{
        this.orders = item ? item.value.filter(x=>x.pedidoStatusId!=1&&x.pedidoStatusId!=2&&x.pedidoStatusId!=4) : null;
       
        if(this.orders!=null && this.orders.length >=1){
          this.haveOrders = true
        }
        
    })
}

getDateTime(date){
  date = new Date(date);
  var newDate = ((date.getDate() + " " + this.meses[(date.getMonth())] + " " + date.getFullYear()+ " as " + date.getHours()+ ":" + date.getMinutes()))
  return newDate
}
eventSearch(event, isFromFunc = false)
{
  
  let name = event.target.value as String;
  
  if(name == ""|| name == null){
    this.resetFilter()
  }
  else{
    name = name.toLowerCase();
    if(this.oldOrders.length > 0 && this.orders.length == 0){
      this.orders = this.oldOrders;
     
      
    }
    if(this.searchForm.value["date"]!="" && !isFromFunc){
      let event = {
        target:{
          value:this.searchForm.value["date"]
        }
      }
      this.eventSearchDate(event,true)
    }
    this.filterByName(name);
    if(this.orders.length == 0){
      this.orders = this.oldOrders;
      this.filterByAddressStreet(name);
      if(this.orders.length == 0){
        this.orders = this.oldOrders;
        this.filterByAddressCity(name);
        if(this.orders.length == 0){
          this.orders = this.oldOrders;
          this.filterBytitle(name);
          if(this.orders.length == 0){
            this.orders = this.oldOrders;
            this.filterbyStatus(name);
            if(this.orders.length == 0){
              this.orders = this.oldOrders;
              this.filterbyCode(name);
            }
          }
        }
      }
    }
  }
  
  
}
eventSearchDate(event, isFromFunc = false)
{
  if(this.oldOrders.length > 0 && this.orders.length == 0){
    this.orders = this.oldOrders;
  }
  if(this.searchForm.value["name"]!="" && !isFromFunc){
    let event = {
      target:{
        value:this.searchForm.value["name"]
      }
    }
    this.eventSearch(event, true)
  }
  let name = event.target.value as String;
  this.filterByDate(name)
}

private filterByName(name)
{
  if(name !="" && this.oldOrders.length == 0){
    this.oldOrders = this.orders;
    this.orders = this.orders.filter(x=>x.usuarioEndereco.usuario.nome.toLowerCase().includes(name))
  }
  else if(name !="" && this.oldOrders.length != 0){
    this.orders = this.orders.filter(x=>x.usuarioEndereco.usuario.nome.toLowerCase().includes(name))
  }
}
private filterBytitle(name)
{
  if(name !="" && this.oldOrders.length == 0){
    this.oldOrders = this.orders;
    this.orders = this.orders.filter(x=>x.cupom.campanha.titulo.toLowerCase().includes(name))
  }
  else if(name !="" && this.oldOrders.length != 0){
    this.orders = this.orders.filter(x=>x.cupom.campanha.titulo.toLowerCase().includes(name))
  }
  
}
private filterByAddressStreet(name)
{
  if(name !="" && this.oldOrders.length == 0){
    this.oldOrders = this.orders;
    this.orders = this.orders.filter(x=>x.usuarioEndereco.logradouro.toLowerCase().includes(name))
  }
  else if(name !="" && this.oldOrders.length != 0){
    this.orders = this.orders.filter(x=>x.usuarioEndereco.logradouro.toLowerCase().includes(name))
  }
}
private filterByAddressCity(name)
{
  if(name !="" && this.oldOrders.length == 0){
    this.oldOrders = this.orders;
    this.orders = this.orders.filter(x=>x.usuarioEndereco.cidade.toLowerCase().includes(name))
  }
  else if(name !="" && this.oldOrders.length != 0){
    this.orders = this.orders.filter(x=>x.usuarioEndereco.cidade.nome.toLowerCase().includes(name))
  }
}

filterbyCode(code){
  
  if(code !="" && this.oldOrders.length == 0){
    this.oldOrders = this.orders;
    this.orders = this.orders.filter(x=>x.cupom.codigo.toLowerCase().includes(code))
  }
  else if(code !="" && this.oldOrders.length != 0){
    this.orders = this.orders.filter(x=>x.cupom.codigo.toLowerCase().includes(code))
  }
}
filterbyStatus(status){
  if(status !="" && this.oldOrders.length == 0){
    let statusNumber =  this.Status(status)
    this.oldOrders = this.orders;
    this.orders = this.orders.filter(x=>x.pedidoStatusId == statusNumber)
  }
  else if(status !="" && this.oldOrders.length != 0){
    let statusNumber =  this.Status(status)
    this.orders = this.orders.filter(x=>x.pedidoStatusId == statusNumber)
  }
}
Status(status){

    if("recusado".toLowerCase().includes(status)){
      return 3;
    }
    if("cancelado".toLowerCase().includes(status)){
      return 6;
    }
    if("finalizado".toLowerCase().includes(status)){
      return 5;
    }
    else{
      return 0;
    }
   
}
private filterByDate(date)
{
  if(date !="" && this.oldOrders.length == 0){
    this.oldOrders = this.orders;
    this.orders = this.orders.filter(x=>this.verifyDate(x.realizadoEm,date))
  }
  else if(date !="" && this.oldOrders.length != 0){
    let newdate = new Date(date);
    this.orders = this.orders.filter(x=>this.verifyDate(x.realizadoEm,date))
  }
  
}
resetFilter(){
  if(this.oldOrders.length != 0){
    
    this.orders = this.oldOrders;
    this.searchForm.reset()
  }
}
verifyDate(xDate, nDate){
 
let xdate = new Date(xDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
let ndate = new Date(nDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
var result = xdate == ndate
return result
}
round(x){
  return Math.round(x).toFixed(2)
}
}

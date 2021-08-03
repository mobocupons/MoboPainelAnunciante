import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  contador : number = 3;
  public couponsForm: FormGroup;
  public searchForm: FormGroup;
  public campanhas: String[];
  public orders: ValueCompleteOrder[] = []
  public oldOrders: ValueCompleteOrder[] = []
  public haveOrders: boolean = false
  public meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
  constructor( private fb: FormBuilder,private orderService: OrderService,
    private localStorageService: LocalStorageService) { 
    this.couponsForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.searchForm = this.fb.group({
      name: [''],
      date: [''],
    });
    this.campanhas = [
      'Delivery: 2 xis salada + refri (600ml) de R$ 42,00 por R$ 35,70.',
      'Delivery: 2 pizza de mussarela média + refri (2L) de R$ 85,00 por R$ 65,00.'
    ];
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
        this.orders = item ? item.value.filter(x=>x.pedidoStatusId!=1&&x.pedidoStatusId!=2) : null;
        if(this.orders!=null){
          
          this.haveOrders = true
        }
    })
}

getDateTime(date){
  date = new Date(date);
  var newDate = ((date.getDate() + " " + this.meses[(date.getMonth())] + " " + date.getFullYear()+ " as " + date.getHours()+ ":" + date.getMinutes()))
  return newDate
}
search()
{
  let name = this.searchForm.value['name']
  let date = this.searchForm.value['date']
  
  this.filterByName(name);
  this.filterByDate(date)
  
}
private filterByName(name)
{
  if(name !="" && this.oldOrders.length == 0){
    this.oldOrders = this.orders;
    this.orders.filter(x=>x.usuarioEndereco.usuario.nome == name)
  }
  else if(name !="" && this.oldOrders.length != 0){
    this.orders.filter(x=>x.usuarioEndereco.usuario.nome == name)
  }
  
}
private filterByDate(date)
{
  
  if(date !="" && this.oldOrders.length == 0){
   
    this.oldOrders = this.orders;
    this.orders.filter(x=>this.verifyDate(x.realizadoEm,date))
    console.log("pesquisou e salvou estado data")
  }
  else if(date !="" && this.oldOrders.length != 0){
    let newdate = new Date(date);
    console.log(newdate)
    this.orders.filter(x=>this.verifyDate(x.realizadoEm,date))
    console.log("pesquisou sem salvar estado data")
  }
  
}
resetFilter(){
    this.orders = this.oldOrders;
    console.log("Limpou")
}
verifyDate(xDate, nDate){
  console.log(nDate)
let xdate = new Date(xDate);
let ndate = new Date(nDate);
var result = (xdate.getDate() == ndate.getDate() && xdate.getMonth() == ndate.getMonth() && xdate.getFullYear() == ndate.getFullYear())
return result
}

}

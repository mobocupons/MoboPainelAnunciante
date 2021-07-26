import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {

  public couponsForm: FormGroup;
  public campanhas: String[];
  public orders: any[] = []
  public haveOrders: boolean = false
  public meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
  constructor( private fb: FormBuilder,private orderService: OrderService,
    private localStorageService: LocalStorageService) { 
    this.couponsForm = this.fb.group({
      name: ['', Validators.required],
      
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
console.log(item)
        this.orders = item ? item.value : null;
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

}

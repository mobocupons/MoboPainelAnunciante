import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import {OrderService} from "src/app/shared/services/order.service"
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public couponsForm: FormGroup;
  public campanhas: String[];
  
  public accepetedOrders: any[] = []
  public pendingOrders:any[] = [{
    codigo: "0451",
    titulo:"Teste 1",
    nome:"Osvaldir",
    telefone:"51982823634",
    status:"pendente",
    previsao:"13:00",
    horario:"12:00"
  },{
    codigo: "0452",
    titulo:"Teste 2",
    nome:"Marcelo",
    telefone:"51982823634",
    status:"pendente",
    previsao:"13:00",
    horario:"12:00"
  },{
    codigo: "0453",
    titulo:"Teste 3",
    nome:"Matheus",
    telefone:"51982823634",
    status:"pendente",
    previsao:"13:00",
    horario:"12:00"
  },{
    codigo: "0454",
    titulo:"Teste 4",
    nome:"Isadora",
    telefone:"51982823634",
    status:"pendente",
    previsao:"13:00",
    horario:"12:00"
  },{
    codigo: "0455",
    titulo:"Teste 5",
    nome:"Pedro",
    telefone:"51982823634",
    status:"pendente",
    previsao:"13:00",
    horario:"12:00"
  },{
    codigo: "0456",
    titulo:"Teste 6",
    nome:"Mateus",
    telefone:"51982823634",
    status:"pendente",
    previsao:"13:00",
    horario:"12:00"
  },{
    codigo: "0457",
    titulo:"Teste 7",
    nome:"Fernanda",
    telefone:"51982823634",
    status:"pendente",
    previsao:"13:00",
    horario:"12:00"
  }]

  selectedOrder: any
  
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
  }

  selectOrder(code)
  {
    console.log(code)
    this.selectedOrder = this.pendingOrders.find(x=>x.codigo == code);
    console.log(this.selectedOrder)
  }
  acceptOrder(code)
  {
    this.accepetedOrders.push(this.pendingOrders.find(x=>x.codigo == code))
    this.selectOrder(code)
    this.pendingOrders = this.pendingOrders.filter(x=>x.codigo != code)
    
  }
  getDailyOrder(){
    let anunciante=  this.localStorageService.getAnunciante();
    let localId = anunciante.locais[0].id;
    this.orderService.getAll(localId).subscribe(item=>{

    })
  }
}

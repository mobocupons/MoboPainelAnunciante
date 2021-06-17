import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public couponsForm: FormGroup;
  public campanhas: String[];
  
  constructor( private fb: FormBuilder,) {
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

}

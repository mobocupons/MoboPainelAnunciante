import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PriceLevelService } from 'src/app/shared/services/price-level.service';
import { ProfessionalService } from 'src/app/shared/services/professional.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  @ViewChild('meuCanvas', { static: true }) elemento: ElementRef;

  public couponsForm: FormGroup;
  public campanhas: String[];

  constructor(private professionalService: ProfessionalService,
    private priceLevelService: PriceLevelService,
    private fb: FormBuilder,
    public toster: ToastrService,
    private modalService: NgbModal,) { 

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

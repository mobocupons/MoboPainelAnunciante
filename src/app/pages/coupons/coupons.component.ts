import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Anunciante } from 'src/app/shared/models/anunciante.model';
import { CampanhaService } from 'src/app/shared/services/campanha.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PriceLevelService } from 'src/app/shared/services/price-level.service';
import { ProfessionalService } from 'src/app/shared/services/professional.service';
import { CouponService } from 'src/app/shared/services/coupon.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  @ViewChild('meuCanvas', { static: true }) elemento: ElementRef;

  public couponsForm: FormGroup;
  public localForm: FormGroup;
  public campanhas: String[];
  public anunciante: Anunciante = this.localStorageService.getAnunciante() as Anunciante;
  public showLoader = false;

  constructor(private professionalService: ProfessionalService,
    private priceLevelService: PriceLevelService,
    private fb: FormBuilder,
    public toster: ToastrService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private campanhaService: CampanhaService,
    private couponService: CouponService) { 

      this.couponsForm = this.fb.group({
        name: ['', Validators.required],
        
      });
      this.localForm = this.fb.group({
        name: [this.anunciante.locais[0].id, Validators.required],
        
      });
      this.campanhas = [
        'Não há campanha de delivery ativa',
      ];
    }

  ngOnInit(): void {
  }

  getCampanhasAtivas(){
    this.campanhaService.getCampanhasAtivasPorAnunciante(this.anunciante.id).subscribe(item=>{
      if(item){
        this.campanhas.push(item)
      }
      
    })
  }

  validateCoupons(){
    this.showLoader = true;
    let coupons = [this.couponsForm.value["name"]];
    let localId = this.localForm.value["name"];
    this.couponService.postValidateCoupon(this.anunciante.id, localId, coupons).subscribe(item=>{
      if(item==null){
        Swal.fire('Cupom não existe',
        'o código indicado não pertence a um cupom',
        'error')
      }
      this.showLoader = false;
    });
  }

}

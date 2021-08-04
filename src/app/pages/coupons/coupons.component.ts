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
import { Local } from 'src/app/shared/models/local.model';
@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  @ViewChild('meuCanvas', { static: true }) elemento: ElementRef;

  public couponsForm: FormGroup;
  public localForm: FormGroup;
  public campanhas: any[];
  public anunciante: Anunciante = this.localStorageService.getAnunciante() as Anunciante;
  public local: Local = this.localStorageService.getLocal() as Local;
  public showLoader = false;
  public hasCampanha = false;

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
        name: [this.local!=null ? this.local.id : this.anunciante.locais[0].id, Validators.required],
        
      });
      this.campanhas = [];
    }

  ngOnInit(): void {
    this.getCampanhasAtivas()
   }

  getCampanhasAtivas(){
    this.campanhaService.getCampanhasAtivasPorAnunciante(this.anunciante.id).subscribe(item=>{
      if(item){
        this.hasCampanha = true;
        this.campanhas = item.value
      }
      
    })
  }

  validateCoupons(){
    this.showLoader = true;
    let coupons = this.convertCouponsStringToCouponsArray();
    let localId = this.localForm.value["name"];

    this.couponService.postValidateCoupon(this.anunciante.id, localId, coupons).subscribe(item=>{
      let validado = true

      item.value.forEach(x => {
        if(x.validado == false){
         validado = false;
        }
      });

      if(!validado){
        Swal.fire('Cupom não pode ser validado',
          'o código indicado não pertence a um cupom ou ja foi validado',
          'error')
      }
      else{
        Swal.fire('Cupom validado!',
        'os cupons foram validados',
        'success')
      }
      this.showLoader = false;
    },
    error=>{
      Swal.fire('Cupom não pode ser validado',
        'o código indicado não pertence a um cupom ou ja foi validado anteriormente',
        'error')
        this.showLoader = false;
    });
  }

  convertCouponsStringToCouponsArray(){
    let couponString = this.couponsForm.value["name"]
    let coupomArray = couponString.split(/\r?\n/);
    return coupomArray;
  }

}

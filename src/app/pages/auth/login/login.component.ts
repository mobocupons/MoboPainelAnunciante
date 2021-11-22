import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { Constants } from "src/app/shared/utils/constants";
import { JwtHelperService } from "@auth0/angular-jwt";
import {CampanhaService} from "../../../shared/services/campanha.service"
import { Anunciante } from 'src/app/shared/models/anunciante.model';
import { Local } from 'src/app/shared/models/local.model';
import Swal from 'sweetalert2';
import { OrderService } from 'src/app/shared/services/order.service';

type UserFields = "email" | "password";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public helper = new JwtHelperService()
  public loginForm: FormGroup;
  public userError = false;
  public formErrors: FormErrors = {
    email: "",
    password: "",
  };
  public errorMessage: any;


  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService,
    private orderService: OrderService,
    private campanhaService: CampanhaService
   ) {
    this.loginForm = fb.group({
      email: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    let token = this.localStorageService.getDowingToken()
    if (token && !this.authService.isTokenExpired(token.accessTokenExpiration)) {
      this.router.navigate(['/dashboard/profissionais']);
    } else {
      this.authService.removeLocalStorage();
    }
  }

  // Simple Login
  login() {
    this.userError = false;
    this.authService.showLoader = true
    this.authService.login(
      this.loginForm.value["email"],
      this.loginForm.value["password"]
    ).subscribe(res => {
      var email = parseInt(this.loginForm.value["email"])
      if(!isNaN(email) && typeof email == "number"){
        this.localStorageService.setItem(Constants.ANUNCIANTE,JSON.stringify(res.value))
        this.campanhaService.getCampanhasAtivasPorAnunciante(res.value.id).subscribe(item=>{
          this.menuVerifyItens(item);
          this.localStorageService.setItem(Constants.ANUNCIANTE,JSON.stringify(res.value))   
          this.authService.showLoader = false;
          this.router.navigate(['/dashboard/coupons']);
        })
       
      }
      else{
        this.campanhaService.getCampanhasAtivasPorAnunciante(res.value.anuncianteId).subscribe(item=>{
          this.menuVerifyItens(item);
          this.orderService.getHistory(res.value.id).subscribe(orderitem=>{
            if(orderitem!=null){
              this.localStorageService.setItem(Constants.HASORDERHISTORY,"true")
            }
            else{
              this.localStorageService.setItem(Constants.HASORDERHISTORY,"false")
            }
            this.localStorageService.setItem(Constants.LOCAL,JSON.stringify(res.value))
            this.localStorageService.setItem(Constants.ANUNCIANTE,JSON.stringify(res.value.anunciante))
            this.authService.showLoader = false;
            this.router.navigate(['/dashboard/coupons']);
          })
        });
      }
    },
      err => {
        this.userError = true;
        this.authService.showLoader = false;
      });
  }
  menuVerifyItens(item){
    if(item == null){
      this.localStorageService.setItem(Constants.HASORDER,"false")
      this.localStorageService.setItem(Constants.HASORDERHISTORY,"false")
    }
    else if(item.value.find(x=>x.deliveryOnline)){
      this.localStorageService.setItem(Constants.HASORDER,"true")
      this.localStorageService.setItem(Constants.HASORDERHISTORY,"true")
    }
    else{
      this.localStorageService.setItem(Constants.HASORDER,"false")
      this.localStorageService.setItem(Constants.HASORDERHISTORY,"false")
    }
  }
}

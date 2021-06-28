import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { Constants } from "src/app/shared/utils/constants";
import { JwtHelperService } from "@auth0/angular-jwt";
import {CampanhaService} from "../../../shared/services/campanha.service"

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
    this.authService.showLoader = true
    this.authService.login(
      this.loginForm.value["email"],
      this.loginForm.value["password"]
    ).subscribe(res => {
      this.localStorageService.setItem(Constants.ANUNCIANTE,JSON.stringify(res.value))
      this.authService.showLoader = false;
      this.router.navigate(['/dashboard/coupons']);
    },
      err => {
        console.log(err)
        this.authService.showLoader = false;
      });
  }
}

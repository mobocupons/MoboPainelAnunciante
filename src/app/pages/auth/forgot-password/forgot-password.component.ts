import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

type UserFields = "recoveryEmail";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public recoverPasswordForm: FormGroup;
  public formErrors: FormErrors = {
    recoveryEmail: "",
  };
  public errorMessage: any;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {
    this.recoverPasswordForm = fb.group({
      recoveryEmail: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.authService.removeLocalStorage();
  }

  recoverPassword() {
    this.authService.showLoader = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';


type UserFields = "password" | "passwordConfirmation";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  public newPasswordForm: FormGroup;
  public formErrors: FormErrors = {
    password: "",
    passwordConfirmation: "",
  };
  public errorMessage: any;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {
    this.newPasswordForm = fb.group({
      password: ["", [Validators.required]],
      passwordConfirmation: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.authService.removeLocalStorage();
  }

  newPassword() {
    this.authService.showLoader = true;
  }
}

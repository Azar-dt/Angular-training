import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { ApiService } from '../service/api.service';
import { TokenService } from '../service/token.service';
import { LoginResponse } from '../types/LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formData!: FormGroup;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  login() {
    let response = this.apiService.login(this.formData.value);
    response.subscribe((val: any) => {
      if (val.accessToken && val.refreshToken) {
        window.localStorage.setItem('accessToken', val.accessToken);
        window.localStorage.setItem('refreshToken', val.refreshToken);
        this.snackBar.open('Login successfully 🚀🚀🚀', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 3000,
          direction: 'ltr',
        });
        this.tokenService.onInit();
      }
    });
  }
}

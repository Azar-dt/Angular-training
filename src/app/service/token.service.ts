import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  accessToken: string = '';
  refreshToken: string = '';
  isLogin: boolean = false;
  constructor(private apiService: ApiService, private router: Router) {}

  onInit() {
    if (
      window.localStorage.getItem('refreshToken') &&
      window.localStorage.getItem('accessToken')
    ) {
      let accessToken = window.localStorage.getItem('accessToken') as string;
      let refreshToken = window.localStorage.getItem('refreshToken') as string;

      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      let jwtHelper: JwtHelperService = new JwtHelperService();
      console.log(
        jwtHelper.isTokenExpired(accessToken),
        jwtHelper.isTokenExpired(refreshToken)
      );

      if (
        jwtHelper.isTokenExpired(accessToken) &&
        jwtHelper.isTokenExpired(refreshToken) // neu ca 2 token deu het han thi logout
      ) {
        this.reset();
      } else if (
        jwtHelper.isTokenExpired(accessToken) &&
        !jwtHelper.isTokenExpired(refreshToken)
      ) {
        this.refreshAccessToken();
      } else {
        const expirationDate = jwtHelper.getTokenExpirationDate(accessToken);
        let date = new Date();

        let timeLeft = expirationDate!.getTime() - date.getTime(); //milisecond
        setTimeout(() => {
          this.refreshAccessToken();
        }, timeLeft - 40 * 1000); // con 40s het han thi refresh

        this.isLogin = true;

        this.router.navigate(['/']);
      }
    } else {
      this.accessToken = '';
      this.refreshToken = '';
      this.isLogin = false;
    }
  }

  reset() {
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
    this.onInit();
  }

  refreshAccessToken() {
    const response = this.apiService.refreshAccessToken({
      refreshToken: this.refreshToken,
    });
    response.subscribe((val: any) => {
      console.log('refreshAccessToken', val);

      if (val.accessToken && val.refreshToken) {
        window.localStorage.setItem('accessToken', val.accessToken);
        window.localStorage.setItem('refreshToken', val.refreshToken);
        this.onInit();
      } else {
        console.log(val);
      }
    });
  }
}

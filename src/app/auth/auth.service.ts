import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/auth/';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private authServiceListener = new Subject<boolean>();
  private isAuthenticated = false;
  private userId: string;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthServiceListener() {
    return this.authServiceListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token && !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authServiceListener.next(true);
    }
  }

  private setAuthTimer(expiresIn: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresIn * 1000);
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post(BACKEND_URL + 'signup', authData).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        this.authServiceListener.next(false);
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        BACKEND_URL + 'login',
        authData
      )
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresIn = response.expiresIn;
            this.setAuthTimer(expiresIn);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authServiceListener.next(true);
            const expirationDate = new Date(Date.now() + expiresIn * 1000);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['/']);
          }
        },
        error => {
          this.authServiceListener.next(false);
        }
      );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authServiceListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
}

import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //user = new Subject<User>();
  //Beahviour subject, also give access, the chance after the data was emitted.
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  API_KEY = environment.FIREBASE_API_KEY;
  signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  logingUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
  constructor(private http: HttpClient, private router: Router) { }


  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(respData => {
      this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
    }));
  }

  loging(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.logingUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(respData => {
      this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
    }));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDurationTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDurationTime);
    }
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const userReceived = new User(email, userId, token, expirationDate);
    this.user.next(userReceived);
    //lo pasamos a milisegundos
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(userReceived));
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro ao executar.';
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Esse email ja existe.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Esse email não esta cadastrado.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'PAsswordInvalido';
        break;
    }

    return throwError(errorMessage);
  }
}

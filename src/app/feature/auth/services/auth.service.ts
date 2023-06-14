import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

import FirebaseUser from 'src/app/core/models/firebase-user.model';
import User from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

export interface RegisterResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface LoginResponse extends RegisterResponse {
  registered: boolean;
}

export interface ReloginResponse {
  id_token: string;
  refresh_token: string;
  expires_in: string;
  project_id: string;
  token_type: string;
  user_id: string;
}

export interface AuthErrorResponse {
  error: {
    error: {
      domain: string;
      reason: string;
      message: string;
    };
    code: number;
    message: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly FIREBASE_DOMAIN = environment.FIREBASE_DOMAIN;
  private readonly FIREBASE_KEY = environment.FIREBASE_KEY;
  private readonly SECURE_TOKEN_DOMAIN = environment.SECURE_TOKEN_DOMAIN;
  private authSubject: BehaviorSubject<FirebaseUser> | undefined;
  private timeOutRef: any | undefined | null;

  constructor(private http: HttpClient, private router: Router) {
    //using behaviour subject so that when subscribed, the subscriber can immedietly get the
    // value, normal subject would not work because in order to receive value, the subscriber need to
    //subscribed before next is called tto receive value.
    this.authSubject = new BehaviorSubject<FirebaseUser | null>(null);
  }

  register(user: User) {
    const firebaseUser = this.createFirebaseUser(user);

    return this.http
      .post<RegisterResponse>(
        `${this.FIREBASE_DOMAIN}/v1/accounts:signUp`,
        firebaseUser,
        {
          params: {
            key: this.FIREBASE_KEY,
          },
        }
      )
      .pipe(this.handleError(), this.handleValidUser(firebaseUser));
  }

  login(user: User) {
    const firebaseUser = this.createFirebaseUser(user);

    return this.http
      .post<LoginResponse>(
        `${this.FIREBASE_DOMAIN}/v1/accounts:signInWithPassword`,
        firebaseUser,
        {
          params: {
            key: this.FIREBASE_KEY,
          },
        }
      )
      .pipe(this.handleError(), this.handleValidUser(firebaseUser));
  }

  logout() {
    //clear timers
    this.clearTimers();
    //nullify user and its token
    this.authSubject.next(null);
    //clear local storage
    localStorage.clear();
    //navigate to root
    this.router.navigate(['/']);
  }

  startForceLogoutTimer(expiryTime: number) {
    if (this.timeOutRef) {
      this.clearTimers();
    }

    this.timeOutRef = setTimeout(() => this.logout(), 1000 * expiryTime);
  }

  getAuthSubject() {
    return this.authSubject;
  }

  relogin() {
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));

    if (!refreshToken) {
      return;
    }

    return this.http
      .post<ReloginResponse>(
        `${this.SECURE_TOKEN_DOMAIN}/v1/token`,
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
        {
          params: {
            key: this.FIREBASE_KEY,
          },
        }
      )
      .pipe(
        take(1),
        tap(({ id_token, refresh_token, expires_in }) => {
          const firebaseUser = new FirebaseUser('', '', true);

          firebaseUser.setAccessToken(id_token);
          firebaseUser.setRefreshToken(refresh_token);
          firebaseUser.setTokenExpiryDate(
            this.calculateTokenExpiryDate(expires_in)
          );
          firebaseUser.setRegistered(true);

          this.authSubject.next(firebaseUser);
          this.setRefreshTokenToLocalStorage(firebaseUser.getRefreshToken());
          this.startForceLogoutTimer(parseInt(expires_in));
        })
      );
  }

  private createFirebaseUser(user: User) {
    return new FirebaseUser(user.getEmail(), user.getPassword(), true);
  }

  private handleError() {
    return catchError((response: AuthErrorResponse) => {
      let message;

      switch (response?.error?.error?.message) {
        case 'EMAIL_EXISTS':
          message = 'Email already exist';
          break;
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD':
          message = 'Invalid email or password';
          break;
        default:
          console.error(response);
          message = 'Unknown error occured';
      }

      return throwError(() => ({ ...response, message }));
    });
  }

  private handleValidUser(firebaseUser: FirebaseUser) {
    return tap(
      ({ idToken, expiresIn, refreshToken, registered }: LoginResponse) => {
        if (registered) {
          firebaseUser.setRegistered(registered);
        }

        firebaseUser.setAccessToken(idToken);
        firebaseUser.setRefreshToken(refreshToken);
        firebaseUser.setTokenExpiryDate(
          this.calculateTokenExpiryDate(expiresIn)
        );

        this.authSubject.next(firebaseUser);
        this.setRefreshTokenToLocalStorage(firebaseUser.getRefreshToken());
        this.startForceLogoutTimer(parseInt(expiresIn));
      }
    );
  }

  private calculateTokenExpiryDate(expiresIn: string) {
    return new Date(new Date().getTime() + parseInt(expiresIn) * 1000);
  }

  private calculateTokenExpiryTime(expiresIn: string) {
    return (
      this.calculateTokenExpiryDate(expiresIn).getTime() - new Date().getTime()
    );
  }

  private setRefreshTokenToLocalStorage(refreshToken: string) {
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
  }

  private clearTimers() {
    if (this.timeOutRef) {
      clearTimeout(this.timeOutRef);
      this.timeOutRef = null;
    }
  }
}

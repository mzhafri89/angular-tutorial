import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import FirebaseUser from 'src/app/core/models/firebase-user.model';
import User from 'src/app/core/models/user.model';

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
  private readonly FIREBASE_DOMAIN = 'https://identitytoolkit.googleapis.com';
  private readonly FIREBASE_KEY = 'AIzaSyBY84TKpV17rf1xOADKB1TLRggHURlnefE';
  private authSubject: BehaviorSubject<FirebaseUser> | undefined;

  constructor(private http: HttpClient) {
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
          new Date(new Date().getTime() + parseInt(expiresIn) * 1000)
        );

        this.authSubject.next(firebaseUser);
      }
    );
  }

  getAuthSubject() {
    return this.authSubject;
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs';

import FirebaseUser from 'src/app/core/models/firebase-user.model';
import { authenticated, register } from './auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export default class AuthEffects {
  register = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      exhaustMap((action) =>
        this.authService.register(action.payload).pipe(
          map((response) => {
            const {
              payload: { getEmail, getPassword },
            } = action;

            const firebaseUser = new FirebaseUser(
              getEmail(),
              getPassword(),
              true
            );

            const { idToken, refreshToken, expiresIn } = response;

            firebaseUser.setAccessToken(idToken);
            firebaseUser.setRefreshToken(refreshToken);
            // ! this should be in a lib or something
            firebaseUser.setTokenExpiryDate(
              this.authService.calculateTokenExpiryDate(expiresIn)
            );
            firebaseUser.setRegistered(true);

            return authenticated({ payload: firebaseUser });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ auth: FirebaseUser }>,
    private authService: AuthService
  ) {}
}

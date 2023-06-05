import { Injectable } from '@angular/core';
import { catchError, map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor() {}

  //FIXME: Guard should re login if refresh token exist in storage
  canActivate(authService: AuthService, router: Router) {
    return authService.getAuthSubject().pipe(
      take(1),
      map((user) => {
        if (!user?.getAccessToken()) {
          return router.createUrlTree(['/auth']);
        }

        return true;
      })
      // catchError(() => {
      //   return authService.relogin().pipe(
      //     // catchError((er) => {

      //     //   return throwError(() => false);
      //     // }),
      //     map((response) => {
      //       if (!response?.id_token) {
      //         return router.createUrlTree(['/auth']);
      //       }

      //       return true;
      //     })
      //   );
      // })
    );
  }
}

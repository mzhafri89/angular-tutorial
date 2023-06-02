import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, exhaustMap, take, throwError } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getAuthSubject().pipe(
      take(1),
      exhaustMap((user) => {
        //FIXME: Not really smart since this read from disk occur on every api call
        const refreshToken = localStorage.getItem('refreshToken');

        if (!user && !refreshToken) {
          return next.handle(req);
        }

        return next
          .handle(
            !user
              ? req
              : req.clone({
                  params: new HttpParams().set('auth', user?.getAccessToken()),
                })
          )
          .pipe(
            catchError((errorResponse) => {
              const errorHandler = throwError(() => errorResponse);

              if (
                !(errorResponse instanceof HttpErrorResponse) ||
                errorResponse.status !== 401
              ) {
                return errorHandler;
              }

              //try to get new access token if refresh token exist

              if (refreshToken) {
                return this.authService.relogin().pipe(
                  exhaustMap(({ id_token }) => {
                    return next.handle(
                      req.clone({
                        params: new HttpParams().set('auth', id_token),
                      })
                    );
                  }),
                  catchError((reloginErrorResponse) =>
                    throwError(() => reloginErrorResponse)
                  )
                );
              }

              return errorHandler;
            })
          );
      })
    );
  }
}

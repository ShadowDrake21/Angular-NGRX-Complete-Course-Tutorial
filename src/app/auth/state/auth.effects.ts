import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  authoLogout,
  autoLogin,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../store/Shared/shared.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private store = inject(Store<AppState>);
  private router = inject(Router);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errRespo) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errRespo.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return signupSuccess({ user, redirect: true });
          }),
          catchError((errRespo) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errRespo.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        if (!user) return of();
        return of(loginSuccess({ user, redirect: false }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authoLogout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['auth/login']);
        })
      );
    },
    { dispatch: false }
  );
}

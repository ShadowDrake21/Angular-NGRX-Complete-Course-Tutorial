import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
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

            return loginSuccess({ user });
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
        ofType(loginSuccess),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}

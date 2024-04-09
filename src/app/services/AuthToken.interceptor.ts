import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getToken } from '../auth/state/auth.selector';

export const AuthTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<AppState>);
  return store.select(getToken).pipe(
    take(1),
    exhaustMap((token) => {
      if (!token) {
        return next(req);
      }
      let modifiedReq = req.clone({
        params: req.params.append('auth', token),
      });
      return next(modifiedReq);
    })
  );
};

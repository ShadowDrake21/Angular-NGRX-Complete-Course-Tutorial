import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { exhaustMap, map, Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { isAuthenticated } from '../auth/state/auth.selector';

export const authGuard: CanActivateFn = (
  route,
  state
):
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> => {
  const store = inject(Store<AppState>);
  const router = inject(Router);
  return store.select(isAuthenticated).pipe(
    map((authenticate) => {
      if (!authenticate) {
        return router.createUrlTree(['auth/login']);
      }
      return true;
    })
  );
};

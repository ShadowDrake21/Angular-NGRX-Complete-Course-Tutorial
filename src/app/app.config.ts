import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';

import { routes } from './app.routes';
import { counterReducer } from './counter/state/counter.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ counter: counterReducer }),
    provideStoreDevtools({
      logOnly: !isDevMode(), // Restrict extension to log-only mode
    }),
  ],
};

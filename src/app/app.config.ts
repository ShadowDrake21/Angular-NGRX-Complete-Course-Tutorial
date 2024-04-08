import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';

import { routes } from './app.routes';
import { EffectsModule } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      EffectsModule.forRoot([]),
      StoreModule.forRoot(appReducer)
    ), ///!!!!!!!!!!!!!!!!!!!!!!!!!
    provideStoreDevtools({
      logOnly: !isDevMode(),
    }),
    provideHttpClient(),
  ],
};

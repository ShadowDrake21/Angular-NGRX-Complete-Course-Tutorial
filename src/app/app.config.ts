import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';

import { routes } from './app.routes';
import { EffectsModule } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.state';
import { AuthEffects } from './auth/state/auth.effects';
import { AuthTokenInterceptor } from './services/AuthToken.interceptor';
import {
  provideRouterStore,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-serializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      EffectsModule.forRoot(AuthEffects),
      StoreModule.forRoot(appReducer),
      StoreRouterConnectingModule.forRoot({
        serializer: CustomSerializer,
      })
    ), ///!!!!!!!!!!!!!!!!!!!!!!!!!
    provideStoreDevtools({
      logOnly: !isDevMode(),
    }),
    provideHttpClient(withInterceptors([AuthTokenInterceptor])),
    provideRouterStore(),
  ],
};

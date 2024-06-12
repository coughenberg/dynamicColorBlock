import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreModule, provideStore } from '@ngrx/store';
import { SpotifyAuthEffects } from './store/spotify-auth/spotify-auth.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideEffects(SpotifyAuthEffects),
    provideHttpClient(),
    importProvidersFrom(StoreModule.forRoot({}), EffectsModule.forRoot([])),
  ],
};

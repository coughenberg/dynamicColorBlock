import { SpotifyAuthEffects } from '../../store/spotify-auth/spotify-auth.effects';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { spotifyAuthReducer } from '../../store/spotify-auth/spotify-auth.reducer';
import { SpotifyConnectionComponent } from './spotify-connection.component';
import { spotifyModuleReducers } from '../../store/reducers';
import { SpotifyEffects } from '../../store/spotify/spotify.effects';

@NgModule({
  declarations: [SpotifyConnectionComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature('spotifyModule', spotifyModuleReducers),
    EffectsModule.forFeature(SpotifyAuthEffects, SpotifyEffects),
  ],
  exports: [SpotifyConnectionComponent],
  providers: [],
  bootstrap: [],
})
export class SpotifyConnectionModule {}

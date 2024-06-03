import { SpotifyEffects } from './../../store/spotify/spotify.effects';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { spotifyReducer } from '../../store/spotify/spotify.reducer';
import { SpotifyConnectionComponent } from './spotify-connection.component';

@NgModule({
  declarations: [SpotifyConnectionComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature('spotify', spotifyReducer),
    EffectsModule.forFeature(SpotifyEffects)
  ],
  exports: [SpotifyConnectionComponent],
  providers: [],
  bootstrap: [],
})
export class SpotifyConnectionModule {}

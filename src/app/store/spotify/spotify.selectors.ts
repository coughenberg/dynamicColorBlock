import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SpotifyState } from './spotify.reducer';

export const selectSpotifyState =
  createFeatureSelector<SpotifyState>('spotify');

export const selectSpotifyCurrentSong = createSelector(
  selectSpotifyState,
  (state: SpotifyState) => state?.currentSong
);

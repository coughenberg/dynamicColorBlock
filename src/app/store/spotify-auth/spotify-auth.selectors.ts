import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SpotifyAuthState } from './spotify-auth.reducer';

export const selectSpotifyState =
  createFeatureSelector<SpotifyAuthState>('spotifyAuth');

export const selectSpotifyClientAuth = createSelector(
  selectSpotifyState,
  (state: SpotifyAuthState) => state?.clientAuth
);

export const selectSpotifyAuthToken = createSelector(
  selectSpotifyState,
  (state: SpotifyAuthState) => state?.userAuth?.access_token
);

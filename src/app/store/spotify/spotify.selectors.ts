import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SpotifyState } from './spotify.reducer';

export const selectGridFormState =
  createFeatureSelector<SpotifyState>('spotify');

export const selectGridFormData = createSelector(
  selectGridFormState,
  (state: SpotifyState) => state?.spotify.auth
);

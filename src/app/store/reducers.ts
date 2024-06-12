import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSpotifyAuth from './spotify-auth/spotify-auth.reducer';
import * as fromSpotify from './spotify/spotify.reducer';

export interface SpotifyModuleState {
  spotifyAuth: fromSpotifyAuth.SpotifyAuthState;
  spotify: fromSpotify.SpotifyState;
}

export const spotifyModuleReducers = {
  spotifyAuth: fromSpotifyAuth.spotifyAuthReducer,
  spotify: fromSpotify.spotifyReducer,
};

export const selectSpotifyModuleState = createFeatureSelector<SpotifyModuleState>('spotifyModule');

export const selectSpotifyState = createSelector(selectSpotifyModuleState, (state: SpotifyModuleState)=> state.spotify)
export const selectSpotifyStateAuth = createSelector(selectSpotifyModuleState, (state: SpotifyModuleState)=> state.spotifyAuth)
import { createReducer, on } from '@ngrx/store';
import { SpotifyAuth } from '../../models/spotify.model';
import {
  authenticateSpotifyTokenFailure,
  authenticateSpotifyTokenSuccess,
  loginSpotifyUserTokenFailure,
  loginSpotifyUserTokenSuccess,
} from './spotify-auth.actions';

export interface SpotifyAuthState {
  clientAuth?: SpotifyAuth & { error?: any };
  userAuth?: SpotifyAuth & { refresh_token?: string; error?: any };
}

export const initialState: SpotifyAuthState = {
  clientAuth: {},
  userAuth: {},
};

export const spotifyAuthReducer = createReducer(
  initialState,
  on(authenticateSpotifyTokenSuccess, (state, { auth }) => ({
    ...state,
    clientAuth: { ...auth, error: undefined },
  })),
  on(authenticateSpotifyTokenFailure, (state, { error }) => ({
    ...state,
    clientAuth: {
      access_token: undefined,
      token_type: undefined,
      expires_in: undefined,
      error,
    },
  })),
  on(loginSpotifyUserTokenSuccess, (state, { auth }) => ({
    ...state,
    userAuth: { ...auth, error: undefined },
  })),
  on(loginSpotifyUserTokenFailure, (state, { error }) => ({
    ...state,
    userAuth: {
      access_token: undefined,
      token_type: undefined,
      expires_in: undefined,
      refresh_token: undefined,
      error,
    },
  }))
);

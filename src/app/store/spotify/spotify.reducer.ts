import { createReducer, on } from '@ngrx/store';
import { SpotifyAuth } from '../../models/spotify.model';
import {
  authenticateSpotifyToken,
  authenticateSpotifyTokenFailure,
  authenticateSpotifyTokenSuccess,
  loginSpotifyUserTokenFailure,
  loginSpotifyUserTokenSuccess,
} from './spotify.actions';

export interface SpotifyState {
  spotify: { auth: SpotifyAuth & { error?: any }; token?: string };
}

export const initialState: SpotifyState = {
  spotify: {
    auth: {},
  },
};

export const spotifyReducer = createReducer(
  initialState,
  on(authenticateSpotifyToken, (state) => ({ ...state })),
  on(authenticateSpotifyTokenSuccess, (state, { auth }) => ({
    ...state,
    spotify: { auth: { ...auth, error: undefined } },
  })),
  on(authenticateSpotifyTokenFailure, (state, { error }) => ({
    ...state,
    spotify: {
      auth: {
        access_token: undefined,
        token_type: undefined,
        expires_in: undefined,
        error,
      },
    },
  })),
  on(loginSpotifyUserTokenSuccess, (state, { auth }) => ({
    ...state,
    spotify: { auth, token: auth.access_token },
  })),
  on(loginSpotifyUserTokenFailure, (state, { error }) => ({
    ...state,
    spotify: {
      auth: {
        access_token: undefined,
        token_type: undefined,
        expires_in: undefined,
        error,
      },
    },
  }))
);

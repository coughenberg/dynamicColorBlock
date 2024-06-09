import { createReducer, on } from '@ngrx/store';
import { SpotifyAuth } from '../../models/spotify.model';
import {
  authenticateSpotifyToken,
  authenticateSpotifyTokenFailure,
  authenticateSpotifyTokenSuccess,
  loginSpotifyUserToken,
  loginSpotifyUserTokenFailure,
  loginSpotifyUserTokenSuccess,
} from './spotify.actions';

export interface SpotifyState {
  spotify: { auth: SpotifyAuth & { error?: any } };
}

export const initialState: SpotifyState = {
  spotify: {
    auth: {
      access_token:
        'BQDBKJ5eo5jxbtpWjVOj7ryS84khybFpP_lTqzV7uV-T_m0cTfwvdn5BnBSKPxKgEb11',
      token_type: 'Bearer',
      expires_in: 3600,
    },
  },
};

export const spotifyReducer = createReducer(
  initialState,
  on(authenticateSpotifyToken, (state) => ({ ...state })),
  on(authenticateSpotifyTokenSuccess, (state, { auth }) => ({
    ...state,
    auth: { ...auth, error: undefined },
  })),
  on(authenticateSpotifyTokenFailure, (state, { error }) => ({
    ...state,
    auth: {
      access_token: undefined,
      token_type: undefined,
      expires_in: undefined,
      error,
    },
  })),
  on(loginSpotifyUserTokenSuccess, (state, { auth }) => ({
    ...state,
    auth: { ...auth, error: undefined },
  })),
  on(loginSpotifyUserTokenFailure, (state, { error }) => ({
    ...state,
    auth: {
      access_token: undefined,
      token_type: undefined,
      expires_in: undefined,
      error,
    },
  }))
);

import { createReducer, on } from '@ngrx/store';
import { SpotifySong } from '../../models/spotify.model';
import {
  getCurrentlyPlayingSuccess,
  getCurrentlyPlayingFailure,
} from './spotify.actions';

export interface SpotifyState {
  currentSong: SpotifySong & { error?: any };
}

export const initialState: SpotifyState = {
  currentSong: {},
};

export const spotifyReducer = createReducer(
  initialState,
  on(getCurrentlyPlayingSuccess, (state, { currentSong }) => ({
    ...state,
    currentSong: { ...currentSong, error: undefined },
  })),
  on(getCurrentlyPlayingFailure, (state, { error }) => ({
    ...state,
    auth: {
      access_token: undefined,
      token_type: undefined,
      expires_in: undefined,
      error,
    },
  }))
);

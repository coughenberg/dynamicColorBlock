import { createAction, props } from '@ngrx/store';
import { SpotifyAuth } from '../../models/spotify.model';

export const authenticateSpotifyToken = createAction(
  '[Spotify] Authenticate Token'
);

export const authenticateSpotifyTokenSuccess = createAction(
  '[Spotify] Authenticate Token Success',
  props<{
    auth: SpotifyAuth;
  }>()
);

export const authenticateSpotifyTokenFailure = createAction(
  '[Spotify] Authenticate Token Failure',
  props<{
    error: any;
  }>()
);

export const loginSpotifyUserToken = createAction(
  '[Spotify] Authenticate User Token'
);

export const handleUserAuthToken = createAction(
  '[Spotify] Handle User Authentication Token',
  props<{
    code: string;
  }>()
);

export const loginSpotifyUserTokenSuccess = createAction(
  '[Spotify] Authenticate User Token Success',
  props<{
    auth: SpotifyAuth;
  }>()
);

export const loginSpotifyUserTokenFailure = createAction(
  '[Spotify] Authenticate User Token Failure',
  props<{
    error: any;
  }>()
);

export const getCurrentlyPlaying = createAction(
  '[Spotify] Retrieve Currently Playing',
  props<{
    authToken: string;
  }>()
);

export const getCurrentlyPlayingSuccess = createAction(
  '[Spotify] Retrieve Currently Playing Success',
  props<{
    auth: SpotifyAuth;
  }>()
);

export const getCurrentlyPlayingFailure = createAction(
  '[Spotify] Retrieve Currently Playing Failure',
  props<{
    error: any;
  }>()
);

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

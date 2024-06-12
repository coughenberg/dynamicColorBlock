import { createAction, props } from '@ngrx/store';
import { SpotifySong } from '../../models/spotify.model';

export const getCurrentlyPlaying = createAction(
    '[Spotify] Retrieve Currently Playing',
    props<{
      authToken: string;
    }>()
  );
  
  export const getCurrentlyPlayingSuccess = createAction(
    '[Spotify] Retrieve Currently Playing Success',
    props<{
        currentSong: SpotifySong;
    }>()
  );
  
  export const getCurrentlyPlayingFailure = createAction(
    '[Spotify] Retrieve Currently Playing Failure',
    props<{
      error: any;
    }>()
  );
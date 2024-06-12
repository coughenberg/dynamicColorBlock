import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  getCurrentlyPlaying,
  getCurrentlyPlayingFailure,
  getCurrentlyPlayingSuccess,
} from './spotify.actions';
import { SpotifyService } from './spotify.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class SpotifyEffects {
  constructor(
    private actions$: Actions,
    private spotifyService: SpotifyService
  ) {}

  getCurrentlyPlaying$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentlyPlaying),
      mergeMap(({ authToken }) =>
        this.spotifyService.getCurrentlyPlaying(authToken).pipe(
          map((currentSong) => getCurrentlyPlayingSuccess({ currentSong })),
          catchError((error) => of(getCurrentlyPlayingFailure({ error })))
        )
      )
    )
  );
}

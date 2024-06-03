import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  authenticateSpotifyToken,
  authenticateSpotifyTokenSuccess,
  authenticateSpotifyTokenFailure,
} from './spotify.actions';
import { SpotifyService } from './spotify.service';

@Injectable()
export class SpotifyEffects {
  constructor(private actions$: Actions, private spotifyService: SpotifyService) {}

  loadAuthToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticateSpotifyToken),
      mergeMap(() =>
        this.spotifyService.getAuthToken().pipe(
          map((auth) => authenticateSpotifyTokenSuccess({ auth })),
          catchError((error) => of(authenticateSpotifyTokenFailure({ error })))
        )
      )
    )
  );
}

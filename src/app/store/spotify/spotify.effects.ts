import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  authenticateSpotifyToken,
  authenticateSpotifyTokenSuccess,
  authenticateSpotifyTokenFailure,
  loginSpotifyUserToken,
  loginSpotifyUserTokenFailure,
  loginSpotifyUserTokenSuccess,
  handleUserAuthToken,
  getCurrentlyPlaying,
} from './spotify.actions';
import { SpotifyService } from './spotify.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class SpotifyEffects {
  constructor(
    private actions$: Actions,
    private spotifyService: SpotifyService,
    private router: Router
  ) {}

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

  loginUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSpotifyUserToken),
        tap(() => {
          const clientId = environment.SPOTIFY_CLIENT_ID;
          const redirectUri = environment.REDIRECT_URI;
          const scope = 'user-read-private user-read-email user-read-currently-playing';
          const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
            scope
          )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
          window.location.href = authUrl;
        })
      ),
    { dispatch: false }
  );

  handleAuthCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleUserAuthToken),
      mergeMap(({ code }) =>
        this.spotifyService.getLoginUserToken(code).pipe(
          map(response => loginSpotifyUserTokenSuccess({auth: response})),
          catchError(error => of(loginSpotifyUserTokenFailure({ error })))
        )
      )
    )
  );

  loginUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSpotifyUserTokenSuccess),
        tap(({ auth }) => {
          localStorage.setItem('access_token', auth.access_token ?? '');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  loginUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSpotifyUserTokenFailure),
        tap((action) => {
          console.error('Login failed', action.error);
        })
      ),
    { dispatch: false }
  );

  getCurrentlyPlaying$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentlyPlaying),
      mergeMap(({authToken}) =>
        this.spotifyService.getCurrentlyPlaying(authToken).pipe(
          map((auth) => authenticateSpotifyTokenSuccess({ auth })),
          catchError((error) => of(authenticateSpotifyTokenFailure({ error })))
        )
      )
    )
  );
}

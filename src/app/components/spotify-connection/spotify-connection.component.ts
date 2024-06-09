import { Component, OnInit } from '@angular/core';
import { SpotifyState } from '../../store/spotify/spotify.reducer';
import { Store } from '@ngrx/store';
import {
  getCurrentlyPlaying,
  handleUserAuthToken,
  loginSpotifyUserToken,
} from '../../store/spotify/spotify.actions';
import { ActivatedRoute } from '@angular/router';
import { selectSpotifyAuth } from '../../store/spotify/spotify.selectors';
import { Observable } from 'rxjs';
import { SpotifyAuth } from '../../models/spotify.model';

@Component({
  selector: 'app-spotify-connection',
  templateUrl: './spotify-connection.component.html',
  styleUrl: './spotify-connection.component.css',
})
export class SpotifyConnectionComponent implements OnInit {
  spotifyAuth$!: Observable<SpotifyAuth | null>;

  code?: string;

  constructor(
    private store: Store<{ spotify: SpotifyState }>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.store.dispatch(handleUserAuthToken({ code }));
      }
    });

    this.spotifyAuth$ = this.store.select(selectSpotifyAuth);
    this.spotifyAuth$.subscribe((data) => {
      if (!data) return;
      this.code = data?.access_token;
    });
  }

  login() {
    this.store.dispatch(loginSpotifyUserToken());
  }

  getCurrentSong() {
    if (this.code) {
      this.store.dispatch(getCurrentlyPlaying({ authToken: this.code }));
    }
  }
}

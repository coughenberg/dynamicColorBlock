import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { SpotifyAuthState } from '../../store/spotify-auth/spotify-auth.reducer';
import { Store } from '@ngrx/store';
import {
  handleUserAuthToken,
  loginSpotifyUserToken,
} from '../../store/spotify-auth/spotify-auth.actions';
import { ActivatedRoute } from '@angular/router';
import { selectSpotifyAuthToken } from '../../store/spotify-auth/spotify-auth.selectors';
import { Observable } from 'rxjs';
import { getCurrentlyPlaying } from '../../store/spotify/spotify.actions';
import { SpotifyState } from '../../store/spotify/spotify.reducer';

@Component({
  selector: 'app-spotify-connection',
  templateUrl: './spotify-connection.component.html',
  styleUrl: './spotify-connection.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotifyConnectionComponent implements OnInit {
  spotifyAuthToken$!: Observable<string | undefined>;

  code?: string;

  constructor(
    private storeAuth: Store<{ spotifyAuth: SpotifyAuthState }>,
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

    this.spotifyAuthToken$ = this.store.select(selectSpotifyAuthToken);
    this.spotifyAuthToken$.subscribe((authToken) => {
      if (!authToken) return;
      this.code = authToken;
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

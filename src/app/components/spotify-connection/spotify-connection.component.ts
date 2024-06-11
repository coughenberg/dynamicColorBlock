import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { SpotifyState } from '../../store/spotify/spotify.reducer';
import { Store } from '@ngrx/store';
import {
  getCurrentlyPlaying,
  handleUserAuthToken,
  loginSpotifyUserToken,
} from '../../store/spotify/spotify.actions';
import { ActivatedRoute } from '@angular/router';
import { selectSpotifyAuthToken } from '../../store/spotify/spotify.selectors';
import { Observable } from 'rxjs';

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

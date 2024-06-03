import { Component, OnInit } from '@angular/core';
import { SpotifyState } from '../../store/spotify/spotify.reducer';
import { Store } from '@ngrx/store';
import { authenticateSpotifyToken } from '../../store/spotify/spotify.actions';

@Component({
  selector: 'app-spotify-connection',
  templateUrl: './spotify-connection.component.html',
  styleUrl: './spotify-connection.component.css',
})
export class SpotifyConnectionComponent implements OnInit {
  constructor(private store: Store<{ spotify: SpotifyState }>) {
  }

  ngOnInit() {
    this.store.dispatch(authenticateSpotifyToken());
  }
}

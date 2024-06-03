import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpotifyAuth } from '../../models/spotify.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  baseUrl = 'https://accounts.spotify.com/api';
  constructor(private http: HttpClient) {}

  getAuthToken() {
    const body = new HttpParams()
      .set('client_id', environment.SPOTIFY_CLIENT_ID)
      .set('client_secret', environment.SPOTIFY_CLIENT_SECRET)
      .set('grant_type', 'client_credentials');
    return this.http.post<SpotifyAuth>(
      `${this.baseUrl}/token`,
      body.toString(),
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
}

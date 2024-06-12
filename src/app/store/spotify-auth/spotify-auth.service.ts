import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpotifyAuth } from '../../models/spotify.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyAuthService {
  baseUrl = 'https://accounts.spotify.com/api';

  serverBaseUrl = environment.MUSIC_MICROSERVICE_URL;

  constructor(private http: HttpClient) {}

  getAuthToken() {
    const body = new HttpParams()
      .set('client_id', environment.SPOTIFY_CLIENT_ID)
      .set('client_secret', environment.SPOTIFY_CLIENT_SECRET)
      .set('grant_type', 'client_credentials');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<SpotifyAuth>(
      `${this.baseUrl}/token`,
      body.toString(),
      {
        headers,
      }
    );
  }

  getLoginUserToken(code: string) {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', environment.REDIRECT_URI)
      .set('client_id', environment.SPOTIFY_CLIENT_ID)
      .set('client_secret', environment.SPOTIFY_CLIENT_SECRET);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(`${this.baseUrl}/token`, body, {
      headers,
    });
  }
}

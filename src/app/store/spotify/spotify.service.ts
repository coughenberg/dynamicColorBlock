import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpotifyAuth } from '../../models/spotify.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  serverBaseUrl = environment.MUSIC_MICROSERVICE_URL;

  constructor(private http: HttpClient) {}

  getUserAuthToken(authToken: string): HttpParams {
    return new HttpParams().set('token', authToken);
  }

  getCurrentlyPlaying(authToken: string) {
    const params = this.getUserAuthToken(authToken);

    return this.http.get(`${this.serverBaseUrl}/currently-playing`, {
      params,
    });
  }
}

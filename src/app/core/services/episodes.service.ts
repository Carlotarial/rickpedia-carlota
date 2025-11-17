import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Episode } from '../models/episode.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {}

  getEpisodes(page: number = 1, name?: string): Observable<ApiResponse<Episode> | null> {
    let params = new HttpParams().set('page', page);
    if (name) params = params.set('name', name);

    return this.http.get<ApiResponse<Episode>>(this.baseUrl, { params }).pipe(
      catchError(err => {
        console.error('Error fetching episodes', err);
        return of(null);
      })
    );
  }

  getEpisode(id: number): Observable<Episode | null> {
    return this.http.get<Episode>(`${this.baseUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error fetching episode', err);
        return of(null);
      })
    );
  }
}

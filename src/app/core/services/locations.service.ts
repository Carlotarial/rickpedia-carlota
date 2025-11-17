import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Location } from '../models/location.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/location';

  constructor(private http: HttpClient) {}

  getLocations(page: number = 1, name?: string): Observable<ApiResponse<Location> | null> {
    let params = new HttpParams().set('page', page);
    if (name) params = params.set('name', name);

    return this.http.get<ApiResponse<Location>>(this.baseUrl, { params }).pipe(
      catchError(err => {
        console.error('Error fetching locations', err);
        return of(null);
      })
    );
  }

  getLocation(id: number): Observable<Location | null> {
    return this.http.get<Location>(`${this.baseUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error fetching location', err);
        return of(null);
      })
    );
  }
}

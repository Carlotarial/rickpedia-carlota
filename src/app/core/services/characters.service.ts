import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Character } from '../models/character.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(
    page: number = 1,
    name?: string,
    status?: string,
    species?: string
  ): Observable<ApiResponse<Character> | null> {
    let params = new HttpParams().set('page', page);
    if (name) params = params.set('name', name);
    if (status) params = params.set('status', status);
    if (species) params = params.set('species', species);

    return this.http.get<ApiResponse<Character>>(this.baseUrl, { params }).pipe(
      catchError(err => {
        console.error('Error fetching characters', err);
        return of(null);
      })
    );
  }

  getCharacter(id: number): Observable<Character | null> {
    return this.http.get<Character>(`${this.baseUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error fetching character', err);
        return of(null);
      })
    );
  }
}

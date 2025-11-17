import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamMember } from '../models/team-member.model';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly baseUrl = 'http://localhost:3000/team';

  constructor(private http: HttpClient) {}

  getTeam(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(this.baseUrl).pipe(
      catchError((err) => {
        console.error('Error fetching team', err);
        return of([]);
      })
    );
  }

  addMember(member: Omit<TeamMember, 'id'>): Observable<TeamMember | null> {
    return this.http.post<TeamMember>(this.baseUrl, member).pipe(
      catchError((err) => {
        console.error('Error adding member', err);
        return of(null);
      })
    );
  }

  updateMember(id: number, partial: Partial<TeamMember>): Observable<TeamMember | null> {
    return this.http.patch<TeamMember>(`${this.baseUrl}/${id}`, partial).pipe(
      catchError((err) => {
        console.error('Error updating member', err);
        return of(null);
      })
    );
  }

  deleteMember(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      map(() => true),
      catchError((err) => {
        console.error('Error deleting member', err);
        return of(false);
      })
    );
  }
}

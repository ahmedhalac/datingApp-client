import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}/users`);
  }

  getMember(username: string): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/users/${username}`);
  }
}

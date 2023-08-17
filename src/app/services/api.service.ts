import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';
import { UserParams } from '../models/userParams';

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

  getMembers(userParams: UserParams) {
    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    const url = `${this.baseUrl}/users`;
    return this.getPaginatedResult(url, params);
  }

  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((res) => {
        if (res.body) {
          paginatedResult.result = res.body;
        }
        const pagination = res.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

  getMember(username: string): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/users/${username}`);
  }

  updateMember(member: Member) {
    return this.http.put(`${this.baseUrl}/users`, member);
  }

  addLike(username: string) {
    return this.http.post(`${this.baseUrl}/likes/${username}`, {});
  }

  getLikes(predicate: string) {
    return this.http.get<Member[]>(
      `${this.baseUrl}/likes/?predicate=${predicate}`
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
    return params;
  }
}

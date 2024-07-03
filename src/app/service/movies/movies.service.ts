import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  private checkServerAvailability(): Observable<boolean> {
    const healthCheckUrl = `${environment.serverUrl}/health`;
    return this.http.get<{status: string}>(healthCheckUrl)
      .pipe(
        map(response => response.status === 'Up and Running' ? true : false),
        catchError(() => of(false)),
      );
  }

  getMoviesByName(search: string): Observable<any> {
    return this.checkServerAvailability()
      .pipe(
        switchMap(isServerAvailable => {
          if (isServerAvailable) {
              return this.getMoviesByNameByExpress(search);
          } else {
            return this.getMoviesByNameFromRapid(search);
          }
        }),
        catchError(() => of([])),
      )
  }

  getMoviesByNameByExpress(search: string) {
    const fullUrl = `${environment.serverUrl}/api/movies`;
    console.log('express');
    return this.http.get(fullUrl, { params: { q: search } });
  }

  getMoviesByNameFromRapid(search: string) {
    const fullUrl = `https://${environment.rapidHostUrl}/auto-complete`;
    console.log('rapidDirect');
    return this.http.get(fullUrl, { headers: {
      'X-RapidAPI-Key': environment.RAPIDAPI_KEY as string,
      'X-RapidAPI-Host': environment.rapidHostUrl as string,
    }, params: { q: search } } );
  }
}

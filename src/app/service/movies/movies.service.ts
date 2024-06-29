import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMoviesByName(search: string) {
    const fullUrl = `${environment.serverUrl}/api/movies`;
    return this.http.get(fullUrl, { params: { q: search } });
  }
}

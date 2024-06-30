import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  // getMoviesByName(search: string) {
  //   const fullUrl = `${environment.serverUrl}/api/movies`;
  //   return this.http.get(fullUrl, { params: { q: search } });
  // }

  getMoviesByName(search: string) {
    const fullUrl = `${environment.serverUrl}/auto-complete`;
    return this.http.get(fullUrl, { headers: {
      'X-RapidAPI-Key': environment.RAPIDAPI_KEY as string,
      'X-RapidAPI-Host': environment.rapidHostUrl as string,
    }, params: { q: search } } );
  }
}

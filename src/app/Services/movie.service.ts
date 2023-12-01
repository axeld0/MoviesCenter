import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of , throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Movie } from '../Model/movies.model';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private jsonServerUrl = './assets/JsonServer/movies.json' ;
  private movies: Movie[] = [];
 


  constructor(private http: HttpClient) {}
  

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.jsonServerUrl)
      .pipe(
        catchError(error => {
          console.error('Error loading movies:', error);
          throw error;  
        })
      );
  }
  

  getMovieDetails(movieId: string): Observable<Movie | undefined> {
    const movieDetailsUrl = `${this.jsonServerUrl}`;
    
    return this.http.get<{ movies: Movie[] }>(movieDetailsUrl).pipe(
      tap(response => console.log('Server response:', response)),
      catchError(error => {
        console.error(`Error loading details for movie with title ${movieId}:`, error);
        return throwError(undefined);
      }),
      map(response => {
        const matchingMovies = response.movies.filter(movie => movie.title === movieId);
        return matchingMovies.length > 0 ? matchingMovies[0] : undefined;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Movie } from '../Model/movies.model';


@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private watchlist: Movie[] = [];
  


  addToWatchlist(movie: Movie): void {
    const existingMovie = this.watchlist.find((m) => m.title === movie.title);
    if (!existingMovie) {
      this.watchlist.push(movie);
     
    
    }
  }

  getWatchlist(): Movie[] {
    return this.watchlist;
  }

  remove(movie: Movie): void {
    this.watchlist = this.watchlist.filter((m) => m.title !== movie.title);
    
  }
  isAddedToWatchlist(title: string): boolean {
    return this.watchlist.some((movie) => movie.title === title);
  }
}
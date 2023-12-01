import { Component, OnInit } from '@angular/core';
import { MovieService } from '../Services/movie.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  moviesList: any[] = []
  selectedMovie: any = null;
  selectedSortOption: string = 'Sort by...';

  constructor(private movieService: MovieService,
     private router: Router, 
     private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.movieService.getMovies().subscribe(
      (data: any) => {
        if (Array.isArray(data.movies)) {
          this.moviesList = data.movies.map((movie: any) => ({
            ...movie,
            urlToImage: `assets/resources/${movie.urlToImage}`
          }));
        } else {
          console.error('Data is not an array:', data);
        }
      },
      (error: any) => {
        console.error('Error loading movies:', error);
      }
    );

  }

  openMovieDetail(movie: any) {

    const movieId = movie.title;
    if (movieId) {
      this.movieService.getMovieDetails(movie)

      this.router.navigate(['/movie', movieId]);
    } else {
      console.error('Movie ID is undefined or null.');
    }
  }



  loadMovies(): void {
    this.movieService.getMovies().subscribe(
      (movies: any[]) => {
        this.moviesList = movies;
      },
      (error) => {
        console.error('Error loading movies:', error);
      }
    );
  }

  sortMovies(): void {
    switch (this.selectedSortOption) {
      case 'releaseDate':
        this.moviesList.sort((a, b) => {
          const dateA = new Date(a.ReleasedDate);
          const dateB = new Date(b.ReleasedDate);
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case 'title':
        this.moviesList.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
  }

  goToWatchlist() {
    this.router.navigate(['watchlist'])
  }

}

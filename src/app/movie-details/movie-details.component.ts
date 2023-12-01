import { Component, OnInit,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../Model/movies.model';
import { MovieService } from '../Services/movie.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { WatchlistService } from '../Services/watchlist.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | undefined;
  movieTitle: string = '';
  movieDescription: string = '';
  movieRating: string = '';
  movieDuration: string = '';
  movieGenre: string = '';
  movieReleaseDate: string = '';
  movieTrailerLink: string = '';
  movieurlToImage : string = '';
  buttonText : string = 'Add to Watchlist ⭐'

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private watchlistService: WatchlistService,
  
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get('id');
      
      if (movieId) {
        this.movieService.getMovieDetails(movieId).subscribe(
          (data: Movie | undefined) => {
            if (data) {
              this.movie = data;
              this.movie.urlToImage = `assets/resources/${this.movie.urlToImage}`
              this.renderMovieDetails();
              

            
            } else {
              console.error(`Movie with ID ${movieId} not found.`);
            }
          },
          (error: any) => {
            console.error('Error loading movie details:', error);
          }
        );
      }
    });
   
    
  }

 

  renderMovieDetails(): void {
    if (this.movie) {
      this.movieTitle = this.movie.title;
      this.movieDescription = this.movie.description;
      this.movieRating = this.movie.Rating;
      this.movieDuration = this.movie.Duration;
      this.movieGenre = this.movie.Genre;
      this.movieReleaseDate = this.movie.ReleasedDate;
      this.movieTrailerLink = this.movie['Trailer Link'];
      console.log(this.watchlistService.isAddedToWatchlist(this.movie.title));
      this.buttonText = this.watchlistService.isAddedToWatchlist(this.movie.title) ? 'Added!' : 'Add to Watchlist ⭐';
    }
    
  }

  getVideoUrl(): SafeResourceUrl {
    if (this.movie && this.movie['Trailer Link']) {
      const videoId = this.extractVideoId(this.movie['Trailer Link']);
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    }
    return '';
  }
  
  private extractVideoId(url: string): string | null {
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }


  addToWatchlist(){
    if (this.movie) {
      this.watchlistService.addToWatchlist(this.movie);
      this.buttonText = 'Added!';
    }
  }

}
import { Component, OnInit } from '@angular/core';
import { WatchlistService } from 'src/app/Services/watchlist.service';
import { GoHomeButtonComponent } from '../go-home-button/go-home-button.component';
import { Movie } from 'src/app/Model/movies.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  watchlist: Movie[] = [];

  constructor(private watchlistService: WatchlistService,
              private router : Router
      ) {}

  ngOnInit(): void {
    this.updateWatchlist();

  }

  remove(movie: Movie){
      this.watchlistService.remove(movie);
      this.updateWatchlist();

      const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
    
  }
  goTo(movieId: string){
    this.router.navigate((['/movie', movieId]));
  }

  private updateWatchlist() {
    this.watchlist = this.watchlistService.getWatchlist();
  }
}


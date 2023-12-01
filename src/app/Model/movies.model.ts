
  
  export interface Movie {
    title: string;
    description: string;
    Rating: string;
    Duration: string;
    Genre: string;
    ReleasedDate: string;
    'Trailer Link': string;
    urlToImage : string;
  }

  export interface MoviesResponse {
    movies: Movie[]; 
  }
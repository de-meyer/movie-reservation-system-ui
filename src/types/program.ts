export type Program = {
  id: string;
  movie: Movie;
  shows: Show[];
};

 export type Show = {
    id: string;
    date: string;
    theaterName: string;
  };

  export type Movie = {
  id: string;
  title: string;
  description: string;
  duration: number;
  genre: string;
  director: string;
  cast: string[];
  releaseDate: string;
  rating: number;
  imageProfile: string;
  imageLandscape: string;
};

export type Details = {
  title: string;
  description: string;
  durationMinutes: number;
  director: string;
  genre: string;
  rating: number;
  image: string;
  releaseDate: string;
};
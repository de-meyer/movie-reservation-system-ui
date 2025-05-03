"use client";
import axios from "axios";
import { useEffect } from "react";
import MovieTile from "../_components/movieTile";
import { useState } from "react";
export default function Browse() {
  type Movie = {
    name: string;
    url: string;
    image: string;
  };
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/movie/browse")
      .then((res) => {
        setMovies(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="grid grid-cols-10 gap-4 rounded-lg p-4]">
      {movies.map((movie) => (
        <MovieTile
          key={movie.name}
          title={movie.name}
          url={movie.url}
          image={movie.image}></MovieTile>
      ))}
    </div>
  );
}

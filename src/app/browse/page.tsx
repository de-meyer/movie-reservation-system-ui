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
    <main className="flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="grid grid-cols-10 gap-4 rounded-lg p-4]">
        {movies.map((movie) => (
          <MovieTile
            key={movie.name}
            title={movie.name}
            url={movie.url}
            image="/movie-reservation-system-logo.png"></MovieTile>
        ))}
      </div>
    </main>
  );
}

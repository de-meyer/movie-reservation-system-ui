"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type MovieDetailsProps = {
  slug: string;
};
type Details = {
  title: string;
  description: string;
  durationMinutes: number;
  director: string;
  genre: string;
  rating: number;
  image: string;
  releaseDate: string;
};
export default function MovieDetails(props: MovieDetailsProps) {
  const [details, setDetails] = useState<Details | undefined>(undefined);

  useEffect(() => {
    axios
      .get("http://localhost:8080/movie/" + props.slug)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props]);
  return (
    <div>
      {details && (
        <>
          <h1 className="text-4xl">{details.title}</h1>
          <p>Descriotion: {details.description}</p>
          <p>Duration: {details.durationMinutes} /min</p>
          <p>Director: {details.director}</p>
          <p>Genre: {details.genre}</p>
          <p>Rating: {details.rating}</p>
          <p>Realease-Date: {details.releaseDate}</p>
        </>
      )}
    </div>
  );
}

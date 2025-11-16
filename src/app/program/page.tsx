"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import HighlightCarousel from "../_components/highlightCarousel";

export default function Program() {
  const [programs, setPrograms] = useState<any[]>([]);
  useEffect(() => {
    console.log("Fetching current programs");
    axios
      .get("http://localhost:8080/program/current")
      .then((res) => {
        setPrograms(res.data.content);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  type Show = {
    id: string;
    date: string;
    theaterName: string;
  };

  return (
    <main className="flex min-h-[calc(100vh-var(--header-height))] flex-col bg-linear-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="justify-center flex flex-col w-full gap-12">
        <section>
          <HighlightCarousel programs={programs} />
        </section>
        <section>
          {programs.map((program) => (
            <div key={program.movie.id} className="mb-8 container mx-auto">
              <h2 className="text-2xl font-bold mb-4">{program.movie.title}</h2>
              <p className="mb-2">{program.movie.description}</p>
              <div className=" grid grid-cols-2 gap-4 justify-center items-center">
                <Image
                  src="/movie-reservation-system-logo.png"
                  className="rounded-lg"
                  alt={program.movie.title}
                  width={300}
                  height={450}
                />
                <div className="grid grid-cols-3 gap-4">
                  {program.shows.map((show: Show) => (
                    <div
                      key={show.id}
                      className="border p-4 rounded-lg hover:bg-secondary cursor-pointer">
                      <p>
                        <strong>Showtime:</strong>{" "}
                        {new Date(show.date).toLocaleString()}
                      </p>
                      <p>
                        <strong>Room:</strong> {show.theaterName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

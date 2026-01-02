"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import MovieHighlight from "../_components/highlightCarousel";
import MovieCarousel from "../_components/movieCarousel";
import type { Program } from "~/types/program";

export default function Program() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [todaysPrograms, setTodaysPrograms] = useState<any[]>([]);
  const [tomorrowsPrograms, setTomorrowsPrograms] = useState<any[]>([]);

  useEffect(() => {
    console.log("Fetching todays programs");
    axios
      .get("http://localhost:8080/program/today")
      .then((res) => {
        setTodaysPrograms(res.data.content);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    console.log("Fetching todays programs");
    axios
      .get("http://localhost:8080/program/tomorrow")
      .then((res) => {
        setTomorrowsPrograms(res.data.content);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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

  return (
    <main className="flex min-h-[calc(100vh-var(--header-height))] flex-col bg-linear-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="justify-center flex flex-col w-full gap-12">
        <section>
          <MovieHighlight programs={programs} />
        </section>
        <section className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4 ml-4">Today's Program</h2>
          <MovieCarousel programs={todaysPrograms} />
          <h2 className="text-2xl font-bold mb-4 ml-4">Tomorrow's Program</h2>
          <MovieCarousel programs={tomorrowsPrograms} />
          <h2 className="text-2xl font-bold mb-4 ml-4">Current Program</h2>
          <div className="grid gap-4 grid-cols-5 mb-5">
            {programs.map((program) => (
              <div className="aspect-4/6 relative" key={program.movie.id}>
                <Image
                  src={
                    program.movie.imageProfile
                      ? "/profile/" + program.movie.imageProfile
                      : "/profile/movie_reservation_system-profile.png"
                  }
                  alt={program.movie.title}
                  fill
                  className="rounded-lg cursor-pointer hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

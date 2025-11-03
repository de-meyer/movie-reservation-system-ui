"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieHighlight from "../_components/movieHighlight";

export default function Program() {
  const [programs, setPrograms] = useState<any[]>([]);
  useEffect(() => {
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
    <main className="flex min-h-[calc(100vh-var(--header-height))] flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className=" justify-center flex w-full gap-12 px-4 py-16">
        <section>
          <MovieHighlight programs={programs} />
        </section>
      </div>
    </main>
  );
}

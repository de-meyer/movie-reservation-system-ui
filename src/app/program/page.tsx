"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Program() {
  const [program, setProgram] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/program/current")
      .then((res) => {
        setProgram(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div>Program</div>
      </div>
    </main>
  );
}

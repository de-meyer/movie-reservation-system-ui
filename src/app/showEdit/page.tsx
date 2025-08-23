"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import DataTable from "../_components/DataTable";

export default function Show() {
  type Show = {
    id: string;
    title: string;
  };
  const [show, setShow] = useState<Show[]>([]);

  const columns: ColumnDef<Show>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
  ];
  useEffect(() => {
    axios
      .get("http://localhost:8080/movie/browse")
      .then((res) => {
        setShow(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1>Show Edit</h1>
        <DataTable columns={columns} data={show} />
      </div>
    </main>
  );
}

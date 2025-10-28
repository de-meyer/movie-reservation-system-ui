"use client";
import axios from "axios";
// Replace the following import with your actual Calendar component import
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "@radix-ui/react-label";
import DateTimePicker from "../_components/dateTimePicker";
type Movie = {
  id: string;
  title: string;
  durationMinutes: number;
};

type Theater = {
  id: string;
  name: string;
};
export default function CreateShow() {
  const formSchema = z.object({
    duration: z.string().min(2, {
      message: "no Length.",
    }),
    movie: z.string().min(1, { message: "Please select a movie." }),
    theater: z.string().min(1, { message: "Please select a theater." }),
    date: z.date({
      required_error: "A date is required.",
    }),
    dateTime: z.date({
      required_error: "A date is required.",
    }),
  });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      duration: "",
      movie: "",
      theater: "",
      dateTime: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Create a new Date object with the selected date

    const isoString = values.dateTime.toISOString().replace(/\.\d{3}Z$/, "Z");
    console.log("Submitting show with date:", isoString);
    axios
      .post("http://localhost:8080/show/create", {
        movieId: values.movie,
        theaterId: values.theater,
        date: isoString,
      })
      .then((res) => {
        console.log("then", res.data);
        form.reset({
          duration: "",
          movie: "",
          theater: "",
          dateTime: undefined,
        });
        setSelectedMovie(null);
        /// todo: toast success
      })
      .catch((err) => {
        console.error(err);
      });
  }
  useEffect(() => {
    axios
      .get("http://localhost:8080/movie/createShowInformation")
      .then((res) => {
        setMovies(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get("http://localhost:8080/theater/list")
      .then((res) => {
        setTheaters(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col gap-5">
        <span className="flex text-6xl justify-center items-center text-secondary font-bold">
          Create Show Form
        </span>
        <div className="flex rounded-lg border-1 border-secondary flex-col items-center justify-center px-16 py-16">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-md">
              <FormField
                control={form.control}
                name="movie"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Movie</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        console.log("Selected movie ID:", value);
                        axios
                          .get(`http://localhost:8080/movie/${value}`)
                          .then((res) => {
                            setSelectedMovie(res.data);
                            console.log("Selected movie details:", res.data);
                          })
                          .catch((err) => {
                            console.error(err);
                          });
                      }}
                      value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a movie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {movies.map((movie) => (
                          <SelectItem key={movie.id} value={movie.id}>
                            {movie.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is the movie for the show.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Label htmlFor="duration">
                        {selectedMovie?.durationMinutes
                          ? selectedMovie.durationMinutes + " minutes"
                          : ""}
                      </Label>
                    </FormControl>
                    <FormDescription>Movie duration.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="theater"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Theater</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        console.log("Selected theater ID:", value);
                      }}
                      value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a theater" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {theaters.map((theater) => (
                          <SelectItem key={theater.id} value={theater.id}>
                            {theater.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is the theater for the show.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>DateTime</FormLabel>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormDescription>
                      This is the movie for the show.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="rounded-lg bg-secondary hover:bg-accent cursor-pointer"
                type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

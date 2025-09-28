"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
// Replace the following import with your actual Calendar component import
import { Calendar } from "~/components/ui/calendar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { Label } from "@radix-ui/react-label";
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
    time: z.number().min(1, { message: "Please select a time." }),
  });

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      duration: "",
      movie: "",
      theater: "",
      date: new Date(),
      time: new Date().getTime(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    axios
      .post("http://localhost:8080/show/create", {
        movieId: values.movie,
        theaterId: values.theater,
        date: values.date,
        time: values.time,
      })
      .then((res) => {
        console.log(res.data);
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
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <p>Create Show Form</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="movie"
              render={({ field }) => (
                <FormItem>
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
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
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
              name="theater"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theater</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      console.log("Selected theater ID:", value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
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
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue="10:30:00"
                  />
                  <FormDescription>
                    This is the movie for the show.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] bg-inherit pl-3 text-left font-normal hover:bg-inherit hover:text-white",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                        className=" bg-gradient-to-b from-[#2e026d] to-[#15162c] border-2 border-purple-950"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The date is used for the show.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Label htmlFor="duration">
                      {selectedMovie?.durationMinutes} minutes
                    </Label>
                  </FormControl>
                  <FormDescription>Movie duration.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

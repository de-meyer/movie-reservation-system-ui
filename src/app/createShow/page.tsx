"use client";
import axios from "axios";
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
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
type Movie = {
  id: string;
  title: string;
};
export default function CreateShow() {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    movie: z.string().min(1, { message: "Please select a movie." }),
  });

  const [movies, setMovies] = useState<Movie[]>([]);
  const [id, setId] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: "",
      movie: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
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
                          console.log("Selected movie details:", res.data);
                          form.setValue("username", res.data.title);
                        })
                        .catch((err) => {
                          console.error(err);
                        });
                    }}
                    defaultValue={field.value}>
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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

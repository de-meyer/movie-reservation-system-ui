import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Image from "next/image";
type Program = {
  id: string;
  movie: Movie;
  shows: any[];
};

type Movie = {
  id: string;
  title: string;
  description: string;
  duration: number;
  genre: string;
  director: string;
  cast: string[];
  releaseDate: string;
  rating: number;
  imageProfile: string;
};
export default function MovieCarousel({
  programs,
}: {
  programs: Program[] | null;
}) {
  const DELAY = 12000;

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        // Make carousel wider
        className="w-fit-content mx-auto mb-8 items-stretch">
        {programs && programs.length > 0 ? (
          <div className="">
            <CarouselContent>
              {programs.map((program, index) => (
                <CarouselItem
                  key={index}
                  // Make each item wider
                  className="md:basis-1/6 lg:basis-1/6 xl:basis-1/8 sm:basis-1/4 p-2">
                  <div className="p-2  h-full">
                    <Card className="p-0 border-0 flex flex-col h-full bg-primary cursor-pointer hover:scale-105 transition-transform hover:bg-secondary">
                      <CardContent className="relative aspect-4/5 p-0 ">
                        <Image
                          src={
                            program.movie.imageProfile
                              ? "/profile/" + program.movie.imageProfile
                              : "/profile/movie_reservation_system-profile.png"
                          }
                          alt={program.movie.title}
                          // Make image fit the card better
                          fill
                          className="rounded-lg"
                        />
                      </CardContent>
                      <figcaption className="text-white w-full break-words p-2 text-left font-semibold">
                        {program.movie.title}
                      </figcaption>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="mx-6 bg-accent hover:bg-secondary cursor-pointer" />
            <CarouselNext className="mx-10 bg-accent hover:bg-secondary cursor-pointer" />
          </div>
        ) : (
          <p>No programs for today available.</p>
        )}
      </Carousel>
    </>
  );
}

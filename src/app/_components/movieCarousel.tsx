import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Image from "next/image";
import type { Program } from "~/types/program";

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
          slidesToScroll: 4,
          watchDrag: false,
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
                  <div className="p-2 h-full">
                    <Card className="p-0 border-0 flex flex-col h-full bg-primary cursor-pointer hover:scale-105 transition-transform hover:bg-secondary">
                      <CardContent className="relative aspect-4/6 p-0 ">
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
            <CarouselPrevious
              size={"icon-lg"}
              className="mx-6 text-4xl h-11/12 rounded-lg border-0 w-20 bg-accent hover:bg-secondary cursor-pointer"
            />
            <CarouselNext
              size={"icon-lg"}
              className="mx-10 h-11/12 text-2xl rounded-lg border-0 w-20 bg-accent hover:bg-secondary cursor-pointer"
            />
          </div>
        ) : (
          <p>No programs for today available.</p>
        )}
      </Carousel>
    </>
  );
}

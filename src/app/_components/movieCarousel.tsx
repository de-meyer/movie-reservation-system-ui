import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import Image from "next/image";
type Program = {
  id: string;
  movie: any;
  shows: any[];
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
        className="w-fit-content mx-auto mb-8">
        {programs && programs.length > 0 ? (
          <div className="">
            <CarouselContent>
              {programs.map((program, index) => (
                <CarouselItem
                  key={index}
                  // Make each item wider
                  className="basis-1/8">
                  <div className="p-2">
                    <Card className="p-0 h-70 flex flex-col justify-between bg-primary cursor-pointer hover:scale-105 transition-transform hover:bg-secondary">
                      <CardContent className="relative aspect-square p-0 ">
                        <Image
                          src="/movie-reservation-system-logo.png"
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
          </div>
        ) : (
          <p>No programs for today available.</p>
        )}
      </Carousel>
    </>
  );
}

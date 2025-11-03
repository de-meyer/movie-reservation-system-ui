import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "~/components/ui/carousel";
import Image from "next/image";
type Program = {
  id: string;
  movie: any;
  shows: any[];
};
export default function movieHighlight({
  programs,
}: {
  programs: Program[] | null;
}) {
  console.log("Programs in MovieHighlight:", programs);
  return (
    <>
      <h1 className="px-2 text-4xl">Movie Highlights</h1>
      <Carousel
        opts={{
          align: "start",
        }}
        // Make carousel wider
        className="w-full max-w-6xl">
        {programs && programs.length > 0 ? (
          <CarouselContent>
            {programs.map((program, index) => (
              <CarouselItem
                key={index}
                // Make each item wider
                className="w-full md:basis-3/3 lg:basis-2/4">
                <div className="p-2">
                  <Card className="p-0">
                    {/* Use a wide aspect ratio */}
                    <CardContent className="relative aspect-[16/9]  min-h-[350px] ">
                      <Image
                        src="/movie-reservation-system-logo-carousel.png"
                        alt={program.movie.title}
                        // Make image fit the card better
                        fill
                        className="rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        ) : (
          <p>No programs available.</p>
        )}
        <CarouselNext className="mx-15 bg-secondary" />
      </Carousel>
    </>
  );
}

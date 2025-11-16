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
      <Carousel
        opts={{
          align: "start",
        }}
        // Make carousel wider
        className="w-screen">
        {programs && programs.length > 0 ? (
          <CarouselContent>
            {programs.map((program, index) => (
              <CarouselItem
                key={index}
                // Make each item wider
                className="basis-full">
                <div className="p-2">
                  <Card className="p-0">
                    {/* Use a wide aspect ratio */}
                    <CardContent className="relative aspect-[32/9] ">
                      <Image
                        src="/highlight-logo.png"
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
        <CarouselPrevious className="mx-15 bg-secondary p-8" />
        <CarouselNext className="mx-15 bg-secondary p-8" />
      </Carousel>
    </>
  );
}

import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "~/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import ProgressBar from "./progressBar";
type Program = {
  id: string;
  movie: any;
  shows: any[];
};
export default function MovieHighlight({
  programs,
}: {
  programs: Program[] | null;
}) {
  const DELAY = 12000;
  const [api, setApi] = useState<CarouselApi>();

  return (
    <>
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: DELAY,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        // Make carousel wider
        className="w-screen">
        {programs && programs.length > 0 ? (
          <div className="">
            <CarouselContent>
              {programs.map((program, index) => (
                <CarouselItem
                  key={index}
                  // Make each item wider
                  className="basis-full">
                  <div className="p-2">
                    <Card className="p-0">
                      {/* Use a wide aspect ratio */}
                      <CardContent className="relative aspect-32/9 ">
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
            <div className=" flex justify-center w-full mt-4">
              <ProgressBar
                delay={DELAY}
                api={api}
                className="bg-accent w-2/8 border border-accent"
              />
            </div>
          </div>
        ) : (
          <p>No programs available.</p>
        )}
      </Carousel>
    </>
  );
}

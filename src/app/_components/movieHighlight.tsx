import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Progress } from "~/components/ui/progress";
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
  const DELAY = 12000; // ms
  const [progress, setProgress] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    console.log("Setting up carousel API");
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);
    console.log("current blob:", current);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      console.log("Selected on:", current);
    });
  }, [api]);

  useEffect(() => {
    console.log("Restarting progress bar animation");
    setProgress(0);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / DELAY) * 100, 100));
    }, 50);
    return () => clearInterval(interval);
  }, [current]); // restart on programs change
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
            <div className=" flex justify-center w-full mt-4">
              <Progress
                value={progress}
                className="bg-accent w-2/8 border border-accent"
              />
            </div>
          </div>
        ) : (
          <p>No programs available.</p>
        )}
        <CarouselPrevious className="mx-15 bg-secondary p-8" />
        <CarouselNext className="mx-15 bg-secondary p-8" />
      </Carousel>
    </>
  );
}

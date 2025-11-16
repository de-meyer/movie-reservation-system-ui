import { useEffect, useState } from "react";
import type { CarouselApi } from "~/components/ui/carousel";
import { Progress } from "~/components/ui/progress";

export default function ProgressBar({
  delay,
  api,
  className,
}: {
  delay: number;
  api?: CarouselApi;
  className?: string;
}) {
  const [progress, setProgress] = useState(0);

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
      setProgress(Math.min((elapsed / delay) * 100, 100));
    }, 50);
    return () => clearInterval(interval);
  }, [current]);
  return <Progress value={progress} className={`${className}`} />;
}

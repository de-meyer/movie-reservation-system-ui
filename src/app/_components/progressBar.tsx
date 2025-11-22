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
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
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

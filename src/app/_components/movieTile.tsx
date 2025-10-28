import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
type MovieTileProps = {
  title: string;
  url: string;
  image: string;
};
export default function MovieTile({ title, url, image }: MovieTileProps) {
  const preFix = "data:image/png;base64,";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/movie/${url}`} key={title}>
      {/* Movie Image */}
      <Image
        src={image}
        alt={title}
        width={200}
        height={300}
        className="rounded-lg"
      />
      <figcaption className="color-white">{title} test</figcaption>
    </Link>
  );
}

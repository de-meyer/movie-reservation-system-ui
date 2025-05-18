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
    <Link
      className={`relative w-full  rounded-lg  overflow-hidden transition-transform duration-300 ease-in-out ${
        isHovered
          ? "scale-150 z-10 border-gray-800 bg-gray-900"
          : "scale-100 z-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href={`/movie/${url}`}>
      {/* Movie Image */}
      <Image
        src={`${preFix}${image}`}
        alt={title}
        width={200}
        height={300}
        className="rounded-lg"
      />

      {/* Movie Title (Only Visible on Hover) */}
      {isHovered && (
        <div className="left-0 w-full bg-black  opacity-75 py-2 z-10">
          <p className="text-white text-center text-sm font-semibold ">
            {title}
          </p>
        </div>
      )}
    </Link>
  );
}

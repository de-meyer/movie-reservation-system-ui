import React from "react";

type MovieTileProps = {
  title: string;
  url: string;
  image: string;
};
export default function MovieTile({ title, url, image }: MovieTileProps) {
  return (
    <div>
      <p>{title}</p>
      <p>{url}</p>
    </div>
  );
}

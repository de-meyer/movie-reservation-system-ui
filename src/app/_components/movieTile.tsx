import Image from "next/image";
type MovieTileProps = {
  title: string;
  url: string;
  image: string;
};
export default function MovieTile({ title, url, image }: MovieTileProps) {
  const preFix = "data:image/png;base64,";
  return (
    <div className="border-2 w-full border-gray-800 rounded-lg pb-4 bg-gray-900">
      <Image
        src={`${preFix}${image}`}
        alt={title}
        layout="responsive"
        width={200}
        height={300}
        className="rounded-lg mb-2"
      />
      <p>{title}</p>
    </div>
  );
}

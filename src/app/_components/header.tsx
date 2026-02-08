import HeaderLeft from "./headerLeft";
import HeaderRight from "./headerRight";
export default function Header() {
  return (
    <div className="bg-primary text-white flex w-full header-height items-center justify-between px-4 border-b-1 border-[#15162c] ">
      <HeaderLeft />
      <HeaderRight />
    </div>
  );
}

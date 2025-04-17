import { Search, User, Shuffle, Heart, ShoppingBag } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-[#dceeff] text-gray-700 text-sm">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-gray-300">
        <div className="flex items-center gap-4">
          {/* <div className="flex items-center gap-1 cursor-pointer">
            <span>English</span>
            <span>▼</span>
          </div>
          <div className="h-4 w-px bg-gray-300" />
          <div className="flex items-center gap-1 cursor-pointer">
            <span>USD</span>
            <span>▼</span>
          </div> */}
          {/* <div className="h-4 w-px bg-gray-300" /> */}
          <span>Call Us 3965410</span>
        </div>

        <div className="text-2xl font-bold">
          Flone<span className="text-black">.</span>
        </div>

        <div className="flex items-center gap-5">
          <Search className="w-5 h-5 cursor-pointer" />
          <User className="w-5 h-5 cursor-pointer" />
          <div className="relative">
            <Shuffle className="w-5 h-5 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
          <div className="relative">
            <Heart className="w-5 h-5 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
          <div className="relative">
            <ShoppingBag className="w-5 h-5 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              4
            </span>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="flex justify-center gap-8 py-3 text-base font-medium">
        <div className="cursor-pointer">
          Home<span className="ml-1">▼</span>
        </div>
        <div className="cursor-pointer">
          Shop<span className="ml-1">▼</span>
        </div>
        <div className="cursor-pointer">Collection</div>
        <div className="cursor-pointer">
          Pages<span className="ml-1">▼</span>
        </div>
        <div className="cursor-pointer">
          Blog<span className="ml-1">▼</span>
        </div>
        <div className="cursor-pointer">Contact Us</div>
      </nav>
    </div>
  );
}

import { useState } from "react";
import { Search, User, Shuffle, Heart, ShoppingBag } from "lucide-react";

import { Link } from "react-router-dom";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="bg-[#dceeff] text-gray-700 text-sm relative">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-gray-300">
        <div className="flex items-center gap-4">
          <span>Call Us 3965410</span>
        </div>

        <div className="text-2xl font-bold">
          Flone<span className="text-black">.</span>
        </div>

        <div className="flex items-center gap-5 relative">
          {/* Search Icon */}
          <Search
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              setShowSearch(!showSearch);
              setShowProfile(false);
            }}
          />

          {/* Profile/User Icon */}
          <User
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowSearch(false);
            }}
          />

          {/* Icons with badge */}
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

      {/* Search Dropdown */}
      {showSearch && (
        <div className="absolute top-full right-24 mt-2 shadow-md bg-white p-3 z-50 w-[300px]">
          <div className="flex border border-gray-300">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow px-4 py-2 focus:outline-none text-gray-700"
            />
            <button className="bg-[#b142f5] px-4 flex items-center justify-center">
              <Search className="text-white w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute top-full right-[130px] mt-2 shadow-md bg-white p-4 z-50 w-[200px] text-sm rounded">
          <ul className="space-y-2">
            <li className="text-[#8225ff] font-medium cursor-pointer hover:underline">
              <Link to="/login-register" className="px-4 py-2 cursor-pointer">
                Login
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              {" "}
              <Link to="/login-register" className="px-4 py-2 cursor-pointer">
                Register
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              {" "}
              <Link to="/myaccount" className="px-4 py-2 cursor-pointer">
                My Account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

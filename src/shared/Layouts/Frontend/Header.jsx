import { useState } from "react";
import { Search, User, Shuffle, Heart, ShoppingBag } from "lucide-react";
import { useAuth } from "../../../features/auth/context/AuthContext";
import Navbar from "../../../apps/frontend/components/navbar";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const {
    state: { user, isUserType, isAuthenticated },
  } = useAuth();
  console.log(user);

  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleAuth = (type, action) => {
    dispatch({ type: "LOGOUT" });
    navigate(type === "admin" ? "/admin/login" : "/");
  };

  return (
    <div className="bg-white dark:bg-black text-gray-700 dark:text-white text-sm relative">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 md:px-8 lg:px-12 py-2 md:py-4 lg:py-6 border-b border-gray-300">
        <div className="text-2xl font-bold">
          <Link to="/" className="px-4 py-2">
            Demo<span className="text-black">.</span>
          </Link>
        </div>

        <Navbar />
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
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowSearch(false);
            }}
          >
            {isAuthenticated && (
              <div className="mr-2">Welcome {user.firstName}</div>
            )}{" "}
            {/* Conditional Welcome Text */}
            <User className="w-5 h-5" />
          </div>

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
            {/* If user is not authenticated, show Login and Register options */}
            {!isAuthenticated ? (
              <>
                <li className="text-[#8225ff] font-medium cursor-pointer hover:underline">
                  <Link to="/myaccount/login" className="px-4 py-2">
                    Login
                  </Link>
                </li>
                <li className=" text-[#8225ff] cursor-pointer hover:underline">
                  <Link to="/register" className="px-4 py-2">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-[#8225ff] cursor-pointer hover:underline">
                  <Link to="/myaccount" className="px-4 py-2">
                    My Account
                  </Link>
                </li>
                <li
                  className="text-[#8225ff] cursor-pointer hover:underline"
                  onClick={() => handleAuth("admin", "logout")}
                >
                  Logout
                </li>
              </>
              // If authenticated, show My Account option
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

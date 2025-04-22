import { useState } from "react";
import { Search, User, Shuffle, Heart, ShoppingBag } from "lucide-react";
import { useAuth } from "../../../features/auth/context/AuthContext";
import { useToast } from "../../../core/providers/ToastProvider";
import GlobalTexts from "../../../shared/Utils/Message";
import Navbar from "../../../apps/frontend/components/navbar";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../../features/cart/context/CartContext";
import MiniCart from "./MiniCart";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const { addToast } = useToast();

  const {
    state: { user, isUserType, isAuthenticated },
  } = useAuth();
  //   console.log(isUserType);

  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleAuth = (type, action) => {
    dispatch({ type: "LOGOUT" });
    addToast(GlobalTexts.Auth.logoutSuccess, "success");
    navigate(type === "admin" ? "/admin/login" : "/");
  };

  return (
    <div className="bg-white dark:bg-black text-gray-700 dark:text-white text-sm relative z-[10000]">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 md:py-4 lg:py-6">
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
              )}
              <User className="w-5 h-5" />
            </div>

            {/* Shuffle */}
            {/* <div className="relative">
              <Shuffle className="w-5 h-5 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </div> */}

            {/* Wishlist */}
            {/* <div className="relative">
              <Heart className="w-5 h-5 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </div> */}

            {/* Cart */}
            <div className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="w-5 h-5 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length > 0 ? cart.length : 0}
              </span>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        {showSearch && (
          <div className="absolute top-full right-24 rounded-b shadow-md bg-white dark:bg-black p-3 z-50 w-[300px]">
            <div className="flex border border-gray-300">
              <input
                type="text"
                placeholder="Search"
                className="flex-grow px-4 py-2 focus:outline-none text-gray-700 dark:text-white"
              />
              <button className="bg-[#b142f5] px-4 flex items-center justify-center">
                <Search className="text-white w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Profile Dropdown */}
        {showProfile && (
          <div className="absolute top-full right-[130px] shadow-md bg-white dark:bg-black p-4 z-50 w-[200px] text-sm rounded-b-sm">
            <ul className="space-y-2">
              {!isAuthenticated ? (
                <>
                  <li className="text-black dark:text-white font-medium cursor-pointer hover:underline">
                    <Link to="/login" className="px-4">
                      Login
                    </Link>
                  </li>
                  <li className=" text-black dark:text-white cursor-pointer hover:underline">
                    <Link to="/register" className="px-4">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-black dark:text-white cursor-pointer hover:underline">
                    <Link to="/myaccount" className="px-4">
                      My Account
                    </Link>
                  </li>
                  <li
                    className="text-black dark:text-white cursor-pointer hover:underline"
                    onClick={() => handleAuth(isUserType, "logout")}
                  >
                    <span className="px-4">Logout</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Mini Cart Component */}
        <MiniCart
          isOpen={isCartOpen}
          toggleCart={() => setCartOpen(!isCartOpen)}
        />
      </div>
    </div>
  );
}

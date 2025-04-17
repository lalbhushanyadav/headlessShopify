import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#dceeff] text-gray-700 text-sm flex justify-center gap-8 py-3 text-base font-medium">
      <div className="cursor-pointer relative group">
        Home<span className="ml-1">▼</span>
        <div className="relative left-0 hidden bg-white text-gray-700 group-hover:block shadow-lg py-2 w-48 mt-2">
          <Link to="/home/subitem1" className="px-4 py-2 cursor-pointer">
            Sub-item 1
          </Link>
          <Link to="/home/subitem2" className="px-4 py-2 cursor-pointer">
            Sub-item 2
          </Link>
          <Link to="/home/subitem3" className="px-4 py-2 cursor-pointer">
            Sub-item 3
          </Link>
        </div>
      </div>

      <div className="cursor-pointer relative group">
        Shop<span className="ml-1">▼</span>
        <div className="relative left-0 hidden bg-white text-gray-700 group-hover:block shadow-lg py-2 w-48 mt-2">
          <Link to="/shop/subitem1" className="px-4 py-2 cursor-pointer">
            Sub-item 1
          </Link>
          <Link to="/shop/subitem2" className="px-4 py-2 cursor-pointer">
            Sub-item 2
          </Link>
          <Link to="/shop/subitem3" className="px-4 py-2 cursor-pointer">
            Sub-item 3
          </Link>
        </div>
      </div>

      <div className="cursor-pointer relative group">
        Pages<span className="ml-1">▼</span>
        <div className="relative left-0 hidden bg-white text-gray-700 group-hover:block shadow-lg py-2 w-48 mt-2">
          <Link to="/pages/subitem1" className="px-4 py-2 cursor-pointer">
            Sub-item 1
          </Link>
          <Link to="/pages/subitem2" className="px-4 py-2 cursor-pointer">
            Sub-item 2
          </Link>
          <Link to="/pages/subitem3" className="px-4 py-2 cursor-pointer">
            Sub-item 3
          </Link>
        </div>
      </div>

      <div className="cursor-pointer relative group">
        Blog<span className="ml-1">▼</span>
        <div className="relative left-0 hidden bg-white text-gray-700 group-hover:block shadow-lg py-2 w-48 mt-2">
          <Link to="/blog/subitem1" className="px-4 py-2 cursor-pointer">
            Sub-item 1
          </Link>
          <Link to="/blog/subitem2" className="px-4 py-2 cursor-pointer">
            Sub-item 2
          </Link>
          <Link to="/blog/subitem3" className="px-4 py-2 cursor-pointer">
            Sub-item 3
          </Link>
        </div>
      </div>

      <div className="cursor-pointer relative group">
        <Link to="/contact" className="px-4 py-2 cursor-pointer">
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="text-gray-700 dark:text-white flex justify-center gap-8 py-3 text-sm font-medium">
      <div className="cursor-pointer relative group">
      <span className="flex gap-1 items-center">Home<FaAngleDown /></span>
        <div className="absolute z-5 left-0 hidden bg-white group-hover:flex flex-col shadow-lg py-2 w-48">
          <Link to="/home/subitem1" className="px-4 py-2 cursor-pointer text-gray-700">
            Sub-item 1
          </Link>
          <Link to="/home/subitem2" className="px-4 py-2 cursor-pointer text-gray-700">
            Sub-item 2
          </Link>
          <Link to="/home/subitem3" className="px-4 py-2 cursor-pointer text-gray-700">
            Sub-item 3
          </Link>
        </div>
      </div>

      <div className="cursor-pointer relative group">
      <span className="flex gap-1 items-center">Shop<FaAngleDown /></span>
        <div className="absolute z-5 left-0 hidden bg-white group-hover:flex flex-col shadow-lg py-2 w-48">
          <Link to="/shop/subitem1" className="px-4 py-2 cursor-pointer text-gray-700">
            Sub-item 1
          </Link>
          <Link to="/shop/subitem2" className="px-4 py-2 cursor-pointer text-gray-700">
            Sub-item 2
          </Link>
          <Link to="/shop/subitem3" className="px-4 py-2 cursor-pointer text-gray-700">
            Sub-item 3
          </Link>
        </div>
      </div>

      <div className="cursor-pointer relative group">
        <span className="flex gap-1 items-center">Pages<FaAngleDown /></span>
        <div className="absolute z-5 left-0 hidden bg-white group-hover:flex flex-col shadow-lg py-2 w-48">
          <Link to="/pages/subitem1" className="px-4 py-2 cursor-pointer text-gray-700">
            Sub-item 1
          </Link>
          <Link to="/pages/subitem2" className="px-4 py-2 cursor-pointer text-gray-700">
            Sub-item 2
          </Link>
          <Link to="/pages/subitem3" className="px-4 py-2 cursor-pointer text-gray-700">
            Sub-item 3
          </Link>
        </div>
      </div>

      <div className="cursor-pointer relative group">
      <span className="flex gap-1 items-center">Blog<FaAngleDown /></span>
        <div className="absolute z-5 left-0 hidden bg-white group-hover:flex flex-col shadow-lg py-2 w-48">
          <Link to="/blog/subitem1" className="px-4 py-2 cursor-pointer text-gray-700">
            Sub-item 1
          </Link>
          <Link to="/blog/subitem2" className="px-4 py-2 cursor-pointer text-gray-700">
            Sub-item 2
          </Link>
          <Link to="/blog/subitem3" className="px-4 py-2 cursor-pointer text-gray-700">
            Sub-item 3
          </Link>
        </div>
      </div>

      <div className="cursor-pointer relative group">
        <Link to="/contact" className="cursor-pointer text-gray-700 dark:text-white">
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

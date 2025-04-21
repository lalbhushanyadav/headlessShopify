import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import shopifyClient from "../../../api/shopifyClient";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const loadCollections = async () => {
      const collections = await shopifyClient.fetchCollections();
      //   console.log("Collections:", collections);
      const transformed = collections.map((item, idx) => ({
        title: item.title,
        image: item.image?.url || "", // replace with real image if needed
        handle: item.handle,
      }));
      setCategories(transformed);
      console.log(categories);
      localStorage.setItem("shop_collections", JSON.stringify(transformed));
    };

    loadCollections();
  }, []);
  return (
    <nav className="text-gray-700 dark:text-white flex justify-center gap-8 py-3 text-sm font-medium">
      <div className="cursor-pointer relative group">
        <span className="flex gap-1 items-center">
          <Link to="/" className="cursor-pointer text-gray-700 dark:text-white">
            Home
          </Link>
        </span>
      </div>

      <div className="cursor-pointer relative group">
        <span className="flex gap-1 items-center">
          Collections
          {categories.length > 0 && <FaAngleDown />}
        </span>
        <div className="absolute z-5 left-0 hidden bg-white dark:bg-black group-hover:flex flex-col shadow-lg py-2 w-50">
          {categories.length > 0 &&
            categories.map((category, index) => {
              return (
                <Link
                  to={`/collection/${category.handle}`}
                  className="cursor-pointer text-gray-700 dark:text-white px-4 py-1"
                  key={category.handle}
                >
                  {category.title}
                </Link>
              );
            })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

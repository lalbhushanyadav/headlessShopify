import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import shopifyClient from "../../../api/shopifyClient";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const loadCollections = async () => {
      const collections = await shopifyClient.fetchCollections();

      const transformed = collections.map((item) => ({
        title: item.title,
        image: item.image?.url || "",
        handle: item.handle,
        fullPath: item.title,
        description: item.description,
      }));
      //   console.log(transformed);

      const handleMap = Object.fromEntries(
        transformed.map((col) => [col.title.trim(), col.handle])
      );

      const root = [];
      const lookup = {};

      transformed.forEach((collection) => {
        const parts = collection.title.split(">").map((part) => part.trim());
        let currentLevel = root;

        parts.forEach((part, index) => {
          const path = parts.slice(0, index + 1).join(" > ");

          if (!lookup[path]) {
            const newNode = {
              title: part,
              fullPath: path,
              children: [],
              handle: handleMap[path] || null, // ✅ Lookup correct handle
              image: collection.image,
              description: collection.description,
            };

            lookup[path] = newNode;
            currentLevel.push(newNode);
          }

          currentLevel = lookup[path].children;
        });
      });

      setCategories(root);
      localStorage.setItem("shop_collections", JSON.stringify(root));
    };

    loadCollections();
  }, []);

  return (
    <nav className="text-white dark:text-white flex justify-center gap-8 py-3 text-sm font-medium">
      {categories.length > 0 &&
        categories.map((category) => (
          <div
            className="cursor-pointer relative group"
            key={category.fullPath}
          >
            <span>
              <img src={category.image} title={category.title} width="20px" />
            </span>
            <span className="flex gap-1 items-center capitalize-text">
              {category.title}
              {category.children.length > 0 && <FaAngleDown />}
            </span>

            {/* Dropdown for categories with children */}
            {category.children.length > 0 && (
              <div className="absolute z-5 left-0 hidden bg-white dark:bg-black group-hover:flex flex-col shadow-lg py-2 w-50">
                <ul className="space-y-2">
                  {category.children.map((child) => (
                    <li key={child.fullPath}>
                      <Link
                        to={`/collection/${child.handle}`}
                        className="cursor-pointer text-gray-700 dark:text-white px-4 py-1"
                      >
                        {/* Running letters effect */}
                        <span className="inline-block whitespace-nowrap capitalize-text">
                          {child.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
    </nav>
  );
};
{
  /* Add the CSS animation for running text */
}

export default Navbar;

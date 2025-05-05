import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import shopifyClient from "../../../api/shopifyClient";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const loadCollections = async () => {
      // Fetch collections from Shopify
      const collections = await shopifyClient.fetchCollections();

      // Transform collections into a structured format with slug and hierarchy
      const transformed = collections.map(
        ({ title, image, handle, description }) => {
          const parts = title.split(">").map((p) => p.trim());
          const slug = parts.join("-").toLowerCase().replace(/\s+/g, "-"); // "For me > Demo" => "for-me-demo"
          return {
            title: parts[parts.length - 1], // Current level name
            fullPath: title.trim(), // Full path with ' > '
            slug, // Unique slug identifier
            handle, // Shopify handle (for fetching or routing)
            image: image?.url || "",
            description,
            parts, // For building hierarchy
          };
        }
      );

      // Step 1: Build parent-child relationship (only immediate children)
      const lookup = {}; // Will store each collection by its slug

      // Initialize each collection in lookup with empty children
      transformed.forEach((item) => {
        lookup[item.slug] = { ...item, children: [] };
      });

      // Step 2: Build the parent-child relationships
      const rootItems = [];

      transformed.forEach((item) => {
        // If the item has parent, add it to parent's children array
        const parentSlug = item.slug.split("-").slice(0, -1).join("-"); // Parent slug (e.g., "for-me" for "for-me-demo")

        if (parentSlug && lookup[parentSlug]) {
          lookup[parentSlug].children.push(lookup[item.slug]);
        } else {
          // Otherwise, this is a root item
          rootItems.push(lookup[item.slug]);
        }
      });

      // Step 3: Set the categories and store in localStorage
      setCategories(rootItems);
      localStorage.setItem("shop_collections", JSON.stringify(rootItems));
    };

    loadCollections();
  }, []);

  return (
    <div className="container mx-auto px-4 my-4">
      <nav className="text-white dark:text-white flex justify-center items-center md:gap-3 lg:gap-8 py-5 text-sm font-medium bg-white dark:bg-black">
        {categories.length > 0 &&
          categories.map((category) => (
            <div
              className="cursor-pointer relative group"
              key={category.fullPath}
            >
              <Link
                to={`/collection/${category.handle}`}
                className="cursor-pointer text-gray-700 dark:text-gray-300 md:px-3 lg:px-5 block"
              >
                <figure className="menu-img relative overflow-hidden pt-[40%] block min-h-[40px] mb-3">
                  <img
                    src={category.image}
                    title={category.title}
                    width="70px"
                    className="absolute top-1/2 left-1/2 translate-[-50%] block"
                  />
                </figure>
                <span className="flex gap-1 items-center capitalize-text font-bold">
                  {category.title}
                  {category.children.length > 0 && <FaAngleDown />}
                </span>
              </Link>

              {/* Dropdown for categories with children */}
              {category.children.length > 0 && (
                <div className="absolute z-5 left-0 invisible bg-white dark:bg-black opacity-0 group-hover:visible group-hover:opacity-100 :flex flex-col shadow-lg py-2 w-50 transition-all duration-300 ease-in-out">
                  <ul className="space-y-2">
                    {category.children.map((child) => (
                      <li key={child.fullPath}>
                        <Link
                          to={`/collection/${child.handle}`}
                          className="cursor-pointer text-gray-700 dark:text-gray-300 px-4 py-1"
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
    </div>
  );
};
{
  /* Add the CSS animation for running text */
}

export default Navbar;

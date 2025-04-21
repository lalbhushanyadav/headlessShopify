import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    const crumbs = pathnames.map((name, index) => {
      let routeTo = "/" + pathnames.slice(0, index + 1).join("/");
      let displayName = name
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      if (index === 0 && name === "collection") {
        routeTo = "/collections";
        displayName = "Collections";
      }

      if (index === 0 && name === "product") {
        routeTo = "/products";
        displayName = "Products";
      }

      const isLast = index === pathnames.length - 1;

      return (
        <span key={routeTo} className="flex items-center space-x-1">
          {!isLast ? (
            <>
              <span className="text-gray-600">
                <Link
                  to={routeTo}
                  className="text-blue-600 hover:text-blue-800 dark:text-gray-100 dark:hover:text-gray-300"
                >
                  {displayName}
                </Link>
              </span>
              <span className="text-gray-500">{"/"}</span>
            </>
          ) : (
            <span className="text-gray-400 dark:text-gray-400">{displayName}</span>
          )}
        </span>
      );
    });

    return [
      <span key="home" className="flex items-center space-x-1">
        <Link to="/" className="text-blue-600 hover:text-blue-800 dark:text-gray-100 dark:hover:text-gray-300 font-medium">
          Home
        </Link>
        {pathnames.length > 0 && <span className="text-gray-500">{"/"}</span>}
      </span>,
      ...crumbs,
    ];
  };

  return (
    <div className="">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-1 text-sm py-3 text-gray-700 dark:text-gray-300">
          {generateBreadcrumbs()}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

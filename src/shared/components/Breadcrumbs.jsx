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

      // Special case: if the first segment is "collection", replace with "Collections"
      if (index === 0 && name === "collection") {
        routeTo = "/collections"; // change the URL
        displayName = "Collections"; // change the display name
      }

      return (
        <span key={routeTo} className="text-gray-600">
          <span className="mx-2">/</span>
          <Link to={routeTo} className="hover:underline">
            {displayName}
          </Link>
        </span>
      );
    });

    return [
      <Link
        key="home"
        to="/"
        className="text-gray-800 font-medium hover:underline"
      >
        Home
      </Link>,
      ...crumbs,
    ];
  };

  return (
    <div className="text-sm py-3 px-4 text-gray-700">
      {generateBreadcrumbs()}
    </div>
  );
};

export default Breadcrumb;

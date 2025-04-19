// src/components/common/Breadcrumb.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const crumbs = pathnames.map((name, index) => {
      const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
      return (
        <span key={routeTo} className="text-gray-600 capitalize">
          <span className="mx-2">/</span>
          <Link to={routeTo} className="hover:underline">
            {name.replace(/-/g, " ")}
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

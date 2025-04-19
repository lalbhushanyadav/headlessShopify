import React from "react";
import { Link } from "react-router-dom";

const GridView = ({ data, customHandleEvent, showPrice }) => {
  const handleClickEvent = () => {};
  return (
    <div className="border rounded-lg overflow-hidden p-4 bg-white dark:bg-gray-800 relative grid-item">
      <img
        src={data.image}
        alt={data.title}
        className="cursor-pointer w-full h-64 object-cover mb-4"
        onClick={customHandleEvent}
      />
      <h3
        className="cursor-pointer text-sm font-medium text-center text-gray-800 dark:text-white mb-2"
        onClick={customHandleEvent}
      >
        {data.title}
      </h3>
      {showPrice && (
        <div className="text-center">
          <span className="text-base font-bold text-gray-800 dark:text-white mr-2">
            ${data.price}
          </span>
          <span className="text-sm line-through text-gray-400">
            ${data.compareAtPrice}
          </span>
        </div>
      )}
    </div>
  );
};

export default GridView;

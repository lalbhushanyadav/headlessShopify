import React from "react";

const ThumbnailView = ({ data, customHandleEvent, showPrice }) => {
  return (
    <div className="border flex flex-row items-center rounded-lg overflow-hidden p-4 bg-white dark:bg-gray-800 relative thumbnail-item">
      <figure className="relative overflow-hidden pt-[10%] w-[200px] mr-4 rounded-sm">
        <img
          src={data.image}
          alt={data.title}
          className="cursor-pointer absolute top-1/2 left-1/2 translate-[-50%] w-full h-full object-cover object-top" // Smaller height for thumbnail
          onClick={customHandleEvent}
        />
      </figure>
      <div>
        <h3
          className="cursor-pointer text-sm font-medium text-center text-gray-800 dark:text-white mb-2"
          onClick={customHandleEvent}
        >
          {data.title}
        </h3>
        {showPrice && (
          <div className="">
            <span className="text-base font-bold text-gray-800 dark:text-white mr-2">
              ${data.price}
            </span>
            <span className="text-sm line-through text-gray-400">
              ${data.compareAtPrice}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailView;

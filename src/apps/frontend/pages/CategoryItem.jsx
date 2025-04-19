import React from "react";
import { Link } from "react-router-dom";
const CategoryItem = ({ product }) => {
  console.log(product);
  return (
    <Link to={`/product/${product.handle}`}>
      <div className="border rounded-lg overflow-hidden p-4 bg-white dark:bg-gray-800 relative">
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 bg-purple-500 text-white rounded">
            {product.badge}
          </span>
        )}

        {/* Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-56 object-contain mb-4"
        />

        {/* Title */}
        <h3 className="text-sm font-medium text-center text-gray-800 dark:text-white mb-2">
          {product.title}
        </h3>

        {/* Price */}
        <div className="text-center">
          <span className="text-base font-bold text-gray-800 dark:text-white mr-2">
            ${product.price}
          </span>
          <span className="text-sm line-through text-gray-400">
            ${product.compareAtPrice}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;

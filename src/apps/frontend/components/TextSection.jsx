import React from "react";

const TextSection = ({ subtitle, title, description }) => {
  return (
    <div className="container mx-auto">
      <div className="text-center py-12 max-w-3xl mx-auto px-4">
        {subtitle && (
          <p className="text-sm text-gray-600 dark:text-gray-400 uppercase">{subtitle}</p>
        )}

        {title && (
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-1">{title}</h2>
        )}

        {(title || subtitle) && (
          <div className="w-12 h-1 bg-gray-800 dark:bg-white mx-auto my-4 rounded"></div>
        )}

        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
};

export default TextSection;

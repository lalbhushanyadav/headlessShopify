import React from "react";

const TextSection = ({ subtitle, title, description }) => {
  return (
    <div className="text-center py-12 max-w-3xl mx-auto px-4">
      {subtitle && (
        <p className="text-sm text-gray-600 uppercase">{subtitle}</p>
      )}

      {title && (
        <h2 className="text-3xl font-bold text-gray-800 mt-1">{title}</h2>
      )}

      {(title || subtitle) && (
        <div className="w-12 h-1 bg-gray-800 mx-auto my-4 rounded"></div>
      )}

      {description && (
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default TextSection;

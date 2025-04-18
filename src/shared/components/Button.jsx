import React from "react";

const Button = ({onClick, children, title="", className = "", ...props}) => {
   return (
        <button onClick={onClick} title={title} className={`px-6 py-2 rounded-md bg-gray-900 dark:bg-white text-white dark:text-black border border-gray-900 hover:text-black dark:border-white hover:bg-white dark:hover:text-white dark:hover:bg-gray-900 transition duration-300 ease-in-out shadow-md ${className}`}>
            {children}
        </button>
   )}
export default Button;
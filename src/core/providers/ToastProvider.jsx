// src/context/toastContext.js
import React, { createContext, useContext, useState } from "react";

// Create ToastContext
const ToastContext = createContext();

// Custom hook to use ToastContext
export const useToast = () => {
  return useContext(ToastContext);
};

// ToastProvider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 4000); // Toast will disappear after 4 seconds
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Notifications Container */}
      <div className="fixed bottom-4 right-4 space-y-4 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center p-4 rounded-xl shadow-lg text-white w-72 transition-all duration-300 transform ${
              toast.type === "success"
                ? "border-2 border-green-500 bg-green-500/70"
                : toast.type === "error"
                ? "border-2 border-red-500 bg-red-500/70"
                : "border-2 border-blue-500 bg-blue-500/70"
            } opacity-100 translate-y-0`}
            style={{
              animation: `slide-in 0.5s ease-out, fade-out 0.5s ease-out ${4000}ms`,
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute top-1 right-1 text-white hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Toast Content */}
            <div className="flex-1">
              <p className="font-semibold">
                {toast.type === "success"
                  ? "Success"
                  : toast.type === "error"
                  ? "Error"
                  : "Info"}
              </p>
              <p>{toast.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CSS for Toast Animations */}
      <style>
        {`
          @keyframes slide-in {
            0% {
              transform: translateY(20px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes fade-out {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateY(20px);
            }
          }
        `}
      </style>
    </ToastContext.Provider>
  );
};

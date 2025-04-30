// src/features/cart/context/CartContext.jsx

import { createContext, useContext, useReducer, useEffect } from "react";

// Create context
const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { variantId, quantity, stockQuantity } = action.payload;

      const existingIndex = state.findIndex(
        (item) => item.variantId === variantId
      );

      if (existingIndex !== -1) {
        const existingItem = state[existingIndex];
        const newQuantity = existingItem.quantity + quantity;
        const cappedQuantity = Math.min(newQuantity, stockQuantity);

        const updatedItem = {
          ...existingItem,
          quantity: cappedQuantity,
        };

        return [
          ...state.slice(0, existingIndex),
          updatedItem,
          ...state.slice(existingIndex + 1),
        ];
      }

      // New item
      return [...state, { ...action.payload }];
    }

    case "REMOVE_ITEM":
      return state.filter((item) => item.variantId !== action.payload);

    case "UPDATE_QUANTITY": {
      const { variantId, quantity } = action.payload;
      return state.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      );
    }

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

// Provider
export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("session_cart")) || [];
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    localStorage.setItem("session_cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);

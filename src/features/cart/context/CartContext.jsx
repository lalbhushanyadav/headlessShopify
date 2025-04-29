// src/features/cart/context/CartContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";

// Create context
const CartContext = createContext();

// Cart reducer logic
const cartReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_ITEM": {
      const { id, variantId } = action.payload;

      const existingIndex = state.findIndex(
        (item) => item.id === id && item.variantId === variantId
      );

      if (existingIndex !== -1) {
        // Increase quantity if same product + same variant
        const updatedItem = {
          ...state[existingIndex],
          quantity: state[existingIndex].quantity + action.payload.quantity,
        };
        return [
          ...state.slice(0, existingIndex),
          updatedItem,
          ...state.slice(existingIndex + 1),
        ];
      }

      // If variant is different, add as a new entry
      return [...state, { ...action.payload }];
    }

    case "REMOVE_ITEM":
      return state.filter((_, index) => index !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

// Provider setup
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

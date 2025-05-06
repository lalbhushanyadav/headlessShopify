import React from "react";
import { X } from "lucide-react";
import Messages from "../../../shared/Utils/Message";

const OrderSummary = ({ cart, dispatch, addToast }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (variantId, amount) => {
    const item = cart.find((item) => item.variantId === variantId);
    if (!item) return;

    const newQuantity = item.quantity + amount;
    if (newQuantity >= 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { variantId, quantity: newQuantity },
      });
      addToast(Messages.Cart.itemUpdated, "success");
    }
  };

  const removeItem = (variantId) => {
    dispatch({ type: "REMOVE_ITEM", payload: variantId });
    addToast(Messages.Cart.itemRemoved, "success");
  };

  return (
    <div className="w-full lg:w-1/3 bg-white dark:bg-black text-black dark:text-white p-8 rounded-lg shadow-lg sticky top-6">
      <h3 className="text-2xl font-semibold mb-5">Order Summary</h3>
      <div className="space-y-5">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="text-lg font-medium">{item.title}</h4>
                  <span className="text-gray-500 text-sm">${item.price}</span>
                  {item.selectedOptions && (
                    <div className="text-xs text-gray-500 mt-2">
                      {Object.entries(item.selectedOptions).map(
                        ([key, value]) => (
                          <div key={key}>
                            {key}:{" "}
                            <span className="text-gray-700 dark:text-gray-300">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="text-gray-500 text-sm"
                >
                  &ndash;
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="text-gray-500 text-sm"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-5">
        <div className="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

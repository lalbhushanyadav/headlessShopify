import { useCart } from "../../../features/cart/context/CartContext";
import { X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Messages from "../../../shared/Utils/Message";
import { useToast } from "../../../core/providers/ToastProvider";

export default function MiniCart({ isOpen, toggleCart }) {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleQuantityChange = (id, delta) => {
    const item = cart.find((i) => i.id === id);
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    dispatch({
      type: "ADD_ITEM",
      payload: { ...item, quantity: newQty },
    });
    addToast(Messages.Cart.itemAdded, "success");
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    addToast(Messages.Cart.itemRemoved, "success");
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleCart}
      />

      {/* Sidebar Cart */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white text-black dark:bg-black z-40 shadow-lg transform transition-transform duration-300 dark:text-white ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={toggleCart}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-220px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img
                  onClick={() => {
                    toggleCart();
                    navigate("/product/" + item.handle);
                  }}
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <h4
                    className="text-sm font-medium cursor-pointer"
                    onClick={() => {
                      toggleCart();
                      navigate("/product/" + item.handle);
                    }}
                  >
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-500">
                    ${Number(item.price).toFixed(2)} each
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium cursor-pointer">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 border rounded"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 border rounded"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500"
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        {/* Subtotal + Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Subtotal:</span>
              <span>${Number(subtotal).toFixed(2)}</span>
            </div>

            {/* Placeholder for tax/shipping logic if needed */}
            {/* <div className="flex justify-between text-sm text-gray-500">
              <span>Tax & shipping:</span>
              <span>Calculated at checkout</span>
            </div> */}

            <button
              className="w-full bg-black text-white dark:bg-white dark:text-black py-2 rounded hover:bg-gray-800"
              onClick={() => {
                toggleCart();
                navigate("/cart");
              }}
            >
              Go to Cart
            </button>
            <button
              className="w-full bg-[#8225ff] text-white py-2 rounded hover:bg-purple-700"
              onClick={() => {
                toggleCart();
                navigate("/checkout");
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

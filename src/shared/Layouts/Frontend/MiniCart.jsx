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
      type: "UPDATE_QUANTITY",
      payload: { variantId: item.variantId, quantity: newQty },
    });
    addToast(Messages.Cart.itemUpdated, "success");
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
      <div
        className={`fixed inset-0 bg-black/30 z-30 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleCart}
      />
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white text-black dark:bg-black z-40 shadow-lg transform transition-transform duration-300 dark:text-white ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={toggleCart} className="cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-220px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item, i) => (
              <div
                key={item.id}
                className={`flex gap-4 ${
                  i < item.length - 1 ? "border-b pb-4" : ""
                }`}
              >
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
                <div className="text-right text-sm font-medium">
                  ${Number(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="text-red-600 text-xs"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="block bg-black dark:bg-white text-white dark:text-black text-center py-2 mt-4 rounded-full"
            onClick={toggleCart}
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}

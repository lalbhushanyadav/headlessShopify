import { useCart } from "../../../features/cart/context/CartContext";
import { Link } from "react-router-dom";
import Messages from "../../../shared/Utils/Message";
import { FaRegTrashCan } from "react-icons/fa6";
import { useToast } from "../../../core/providers/ToastProvider";
import Breadcrumb from "../../../shared/components/Breadcrumbs";

export default function CartPage() {
  const { cart, dispatch } = useCart();
  const { addToast } = useToast();

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

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    // addToast(Messages.Cart.itemRemoved, "success");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <Breadcrumb />
      <div className="container mx-auto py-10 px-4">
        <table className="w-full text-left border border-black dark:border-white text-black dark:text-white rounded">
          <thead>
            <tr className="bg-blue-900 text-white dark:bg-gray-950">
              <th className="p-3">Image</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Unit Price</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Subtotal</th>
              <th className="p-3" valign="middle" align="center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  <p className="text-lg font-semibold mb-4">
                    Your cart is empty.
                  </p>
                  <a
                    href="/"
                    className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                  >
                    Continue Shopping
                  </a>
                </td>
              </tr>
            ) : (
              cart.map((item) => (
                <tr key={item.variantId} className="border-t">
                  <td className="p-3">
                    <Link to={`/product/${item.handle}`}>
                      <img src={item.image} alt={item.title} className="w-16" />
                    </Link>
                  </td>
                  <td className="p-3">
                    <Link to={`/product/${item.handle}`}>{item.title}</Link>
                    {item.selectedOptions && (
                      <div className="text-sm text-gray-500 mt-1">
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
                  </td>
                  <td className="p-3">${Number(item.price).toFixed(2)}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 border cursor-pointer"
                        onClick={() => handleQuantityChange(item.variantId, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 border cursor-pointer"
                        onClick={() => handleQuantityChange(item.variantId, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </td>
                  <td className="p-3" align="center" valign="middle">
                    <button
                      className="text-red-600 cursor-pointer"
                      onClick={() => removeItem(item.variantId)}
                    >
                      <FaRegTrashCan />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-between mt-6">
          <button
            onClick={clearCart}
            className="bg-blue-900 hover:bg-blue-200 hover:text-blue-900 text-white transition-all duration-300 ease-in-out px-4 py-2 rounded shadow cursor-pointer"
            disabled={cart.length == 0}
          >
            Clear Shopping Cart
          </button>
          <Link
            to="/"
            className="bg-blue-900 hover:bg-blue-200 hover:text-blue-900 text-white transition-all duration-300 ease-in-out px-4 py-2 rounded shadow"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Cart Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 text-black dark:text-white">
          <div className="border border-black dark:border-white p-4">
            <h4 className="font-semibold mb-2">Estimate Shipping And Tax</h4>
            <input
              className="border border-black dark:border-white p-2 w-full mb-2"
              placeholder="Country"
            />
            <input
              className="border border-black dark:border-white p-2 w-full mb-2"
              placeholder="State"
            />
            <input
              className="border border-black dark:border-white p-2 w-full mb-2"
              placeholder="Postal Code"
            />
            <button className="bg-blue-900 hover:bg-blue-200 hover:text-blue-900 transition-all duration-300 ease-in-out text-white w-full py-2 rounded">
              Get a Quote
            </button>
          </div>
          <div className="border border-black dark:border-white p-4">
            <h4 className="font-semibold mb-2">Use Coupon Code</h4>
            <input
              className="border border-black dark:border-white p-2 w-full mb-2"
              placeholder="Coupon Code"
            />
            <button className="bg-blue-900 hover:bg-blue-200 hover:text-blue-900 text-white transition-all duration-300 ease-in-out w-full py-2 rounded">
              Apply Coupon
            </button>
          </div>
          <div className="border border-black dark:border-white p-4">
            <h4 className="font-semibold mb-2">Cart Total</h4>
            <div className="flex justify-between">
              <span>Total Products</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-black dark:text-white pt-3 border-t border-gray-600 dark:border-gray-300 mt-2">
              <span>Grand Total</span>
              <span>${total.toFixed(2)}</span>
            </div>{" "}
            <Link to={"/checkout/"}>
              <button className="bg-blue-900 hover:bg-blue-200 hover:text-blue-900 text-white transition-all duration-300 ease-in-out w-full py-2 rounded mt-4 cursor-pointer">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

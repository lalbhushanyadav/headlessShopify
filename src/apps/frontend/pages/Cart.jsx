import { useCart } from "../../../features/cart/context/CartContext";
import { Link } from "react-router-dom";
import Messages from "../../../shared/Utils/Message";
import { useToast } from "../../../core/providers/ToastProvider";

export default function CartPage() {
  const { cart, dispatch } = useCart();
  const { addToast } = useToast();

  const handleQuantityChange = (id, amount) => {
    const item = cart.find((item) => item.id === id);
    const newQuantity = item.quantity + amount;
    if (newQuantity >= 1) {
      dispatch({
        type: "ADD_ITEM",
        payload: { ...item, quantity: newQuantity },
      });
      addToast(Messages.Cart.itemAdded, "success");
    }
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    addToast(Messages.Cart.itemRemoved, "success");
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    addToast(Messages.Cart.itemRemoved, "success");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-xl font-bold mb-4">Your cart items</h2>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Image</th>
            <th className="p-3">Product Name</th>
            <th className="p-3">Unit Price</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Subtotal</th>
            <th className="p-3">Action</th>
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
              <tr key={item.id} className="border-t">
                <td className="p-3">
                  <Link to={"/product/" + item.handle}>
                    <img src={item.image} alt={item.title} className="w-16" />
                  </Link>
                </td>
                <td className="p-3">
                  <Link to={"/product/" + item.handle}>{item.title} </Link>
                </td>
                <td className="p-3">${Number(item.price).toFixed(2)}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 border"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 border"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-3">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </td>
                <td className="p-3">
                  <button
                    className="text-red-600"
                    onClick={() => removeItem(item.id)}
                  >
                    &times;
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
          className="bg-gray-200 px-4 py-2 rounded shadow"
          disabled={cart.length == 0}
        >
          Clear Shopping Cart
        </button>
        <Link to="/" className="bg-gray-200 px-4 py-2 rounded shadow">
          Continue Shopping
        </Link>
      </div>

      {/* Cart Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <div className="border p-4">
          <h4 className="font-semibold mb-2">Estimate Shipping And Tax</h4>
          <input className="border p-2 w-full mb-2" placeholder="Country" />
          <input className="border p-2 w-full mb-2" placeholder="State" />
          <input className="border p-2 w-full mb-2" placeholder="Postal Code" />
          <button className="bg-purple-500 text-white w-full py-2 rounded">
            Get a Quote
          </button>
        </div>
        <div className="border p-4">
          <h4 className="font-semibold mb-2">Use Coupon Code</h4>
          <input className="border p-2 w-full mb-2" placeholder="Coupon Code" />
          <button className="bg-purple-500 text-white w-full py-2 rounded">
            Apply Coupon
          </button>
        </div>
        <div className="border p-4">
          <h4 className="font-semibold mb-2">Cart Total</h4>
          <div className="flex justify-between">
            <span>Total Products</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-purple-600 mt-2">
            <span>Grand Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="bg-purple-500 text-white w-full py-2 rounded mt-4">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

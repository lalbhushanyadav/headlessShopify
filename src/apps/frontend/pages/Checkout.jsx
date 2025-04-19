import React, { useState, useEffect } from "react";
import { useCart } from "../../../features/cart/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../core/providers/ToastProvider";
import Messages from "../../../shared/Utils/Message";
import { useAuth } from "../../../features/auth/context/AuthContext";
import { X } from "lucide-react";
import shopifyClient from "../../../api/shopifyClient";

// Input Field Component
const InputField = ({ id, label, type, value, onChange, error }) => (
  <div className="mb-5">
    <label htmlFor={id} className="block text-gray-700 font-medium">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const { addToast } = useToast();
  const { state: authState } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      setFormData({
        firstName: authState.user.firstName || "",
        lastName: authState.user.lastName || "",
        companyName: authState.user.companyName || "",
        country: authState.user.country || "",
        street: authState.user.street || "",
        apartment: authState.user.apartment || "",
        city: authState.user.city || "",
        state: authState.user.state || "",
        zip: authState.user.zip || "",
        phone: authState.user.phone || "",
        email: authState.user.email || "",
        notes: "",
      });
    }
  }, [authState]);

  // Calculate the total amount in the cart
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName)
      newErrors.firstName = Messages.Auth.firstNameMandatoryError;
    if (!formData.lastName)
      newErrors.lastName = Messages.Auth.lastNameMandatoryError;
    if (!formData.email) newErrors.email = Messages.Auth.emailMandatoryError;
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.street) newErrors.street = "Street address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.zip) newErrors.zip = "ZIP code is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Update the customer details
      const updatedCustomer = await shopifyClient.updateCustomerDetails(
        authState.user.accessToken,
        {
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
          phone: formData.phone,
        },
        {
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
          phone: formData.phone,
        }
      );

      // Create the order in Shopify with Cash on Delivery
      const order = await shopifyClient.createOrder(
        authState.user.accessToken,
        cart,
        {
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
          phone: formData.phone,
        },
        {
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
          phone: formData.phone,
        }
      );

      addToast("Order placed successfully!", "success");
      dispatch({ type: "CLEAR_CART" });
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      addToast("Error placing the order.", "error");
      console.error("Error placing order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Quantity Change
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

  // Remove Item from Cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    addToast(Messages.Cart.itemRemoved, "success");
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
      <div className="flex w-full max-w-6xl gap-6">
        {/* Left Column: Checkout Form */}
        <div className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">Checkout</h2>
          <form onSubmit={handlePlaceOrder}>
            <div>
              <h3 className="text-2xl font-semibold mb-5">Billing Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  id="firstName"
                  label="First Name"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />
                <InputField
                  id="lastName"
                  label="Last Name"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
              </div>
              <InputField
                id="companyName"
                label="Company Name"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                error={errors.companyName}
              />
              <InputField
                id="country"
                label="Country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                error={errors.country}
              />
              <InputField
                id="street"
                label="Street Address"
                type="text"
                value={formData.street}
                onChange={handleChange}
                error={errors.street}
              />
              <InputField
                id="apartment"
                label="Apartment, Suite, Unit"
                type="text"
                value={formData.apartment}
                onChange={handleChange}
                error={errors.apartment}
              />
              <InputField
                id="city"
                label="City"
                type="text"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <InputField
                  id="state"
                  label="State"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  error={errors.state}
                />
                <InputField
                  id="zip"
                  label="ZIP Code"
                  type="text"
                  value={formData.zip}
                  onChange={handleChange}
                  error={errors.zip}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <InputField
                  id="phone"
                  label="Phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
              <div className="mt-4">
                <label className="block mb-1 font-medium">
                  Additional Information
                </label>
                <textarea
                  name="notes"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  placeholder="Any special notes or requests for your order"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-lg sticky top-6">
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
                      <span className="text-gray-500 text-sm">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-800">
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
      </div>
    </div>
  );
};

export default Checkout;

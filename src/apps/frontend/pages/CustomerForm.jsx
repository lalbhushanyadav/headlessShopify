import React, { useState, useEffect } from "react";
import Messages from "../../../shared/Utils/Message";
import shopifyClient from "../../../api/shopifyClient";
import { countries } from "../../../shared/data/countries";
import { useCart } from "../../../features/cart/context/CartContext";

// Input Field Component
const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  options,
}) => (
  <div className="mb-5">
    <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
      {label}
    </label>
    {options ? (
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
    )}
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

const CustomerForm = ({ cart, dispatch, authState, addToast, navigate }) => {
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
  const [loading, setLoading] = useState(false);
  const [statesList, setStatesList] = useState([]);

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      const user = authState.user;
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        companyName: user.companyName || "",
        country: user.country || "",
        street: user.street || "",
        apartment: user.apartment || "",
        city: user.city || "",
        state: user.state || "",
        zip: user.zip || "",
        phone: user.phone || "",
        email: user.email || "",
      }));
      console.log(formData);
    }
  }, [authState]);

  useEffect(() => {
    const selectedCountry = countries.find((c) => c.name === formData.country);
    setStatesList(selectedCountry?.states || []);
  }, [formData.country]);

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

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Customer is not logged in.");
    }
    console.log(accessToken);

    setLoading(true);

    try {
      // Build shipping & billing from state
      console.log(formData);
      const shippingAddress = {
        street: formData.street,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        phone: formData.phone,
      };

      const billingAddress = {
        street: formData.street,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        phone: formData.phone,
      };

      console.log(billingAddress);
      console.log(shippingAddress);
      console.log();

      const order = await shopifyClient.createDraftOrder(
        accessToken,
        cart,
        shippingAddress,
        billingAddress,
        formData
      );

      addToast("Order placed successfully!", "success");
      clearCart();
      // optionally redirect to a success page
    } catch (error) {
      addToast(error.message || "Failed to place order", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Checkout</h2>
      <form onSubmit={handlePlaceOrder}>
        <h3 className="text-2xl font-semibold mb-5">Billing Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            id="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <InputField
            id="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
        </div>
        <InputField
          id="companyName"
          label="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          error={errors.companyName}
        />
        <InputField
          id="country"
          label="Country"
          value={formData.country}
          onChange={handleChange}
          error={errors.country}
          options={countries.map((c) => c.name)}
        />
        <InputField
          id="street"
          label="Street Address"
          value={formData.street}
          onChange={handleChange}
          error={errors.street}
        />
        <InputField
          id="apartment"
          label="Apartment, Suite, Unit"
          value={formData.apartment}
          onChange={handleChange}
          error={errors.apartment}
        />
        <InputField
          id="city"
          label="City"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          <InputField
            id="state"
            label="State"
            value={formData.state}
            onChange={handleChange}
            error={errors.state}
            options={statesList}
          />
          <InputField
            id="zip"
            label="ZIP Code"
            value={formData.zip}
            onChange={handleChange}
            error={errors.zip}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          <InputField
            id="phone"
            label="Phone"
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
  );
};

export default CustomerForm;

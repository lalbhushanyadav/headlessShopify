import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import shopifyClient from "../../../api/shopifyClient";
import { useToast } from "../../../core/providers/ToastProvider";
import GlobalTexts from "../../../shared/Utils/Message";
import { useAuth } from "../../../features/auth/context/AuthContext";
import Breadcrumb from "../../../shared/components/Breadcrumbs";

const InputField = ({ id, label, type, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border text-black dark:text-white border-black dark:border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { dispatch } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      validation: () => {
        if (!formData.email) return GlobalTexts.Auth.emailMandatoryError;
        if (!/\S+@\S+\.\S+/.test(formData.email))
          return GlobalTexts.Auth.emailValidError;
        return null;
      },
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      validation: () => {
        if (!formData.password) return GlobalTexts.Auth.passwordMandatoryError;
        return null;
      },
    },
  ];

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(({ id, validation }) => {
      const error = validation();
      if (error) newErrors[id] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Step 1: Login the user
      const tokenData = await shopifyClient.loginUser(
        formData.email,
        formData.password
      );

      // Step 2: Validate if the token exists and is valid
      const accessToken = tokenData.accessToken;
      if (!accessToken || accessToken.trim() === "") {
        throw new Error(
          "Invalid token received. Please check your login credentials."
        );
      }

      // Save the valid token in localStorage
      localStorage.setItem("accessToken", accessToken);

      // Step 3: Fetch customer details using the valid access token
      const customer = await shopifyClient.getCustomerDetails(accessToken);

      if (!customer) {
        throw new Error("Failed to fetch customer details.");
      }

      dispatch({
        type: "LOGIN",
        payload: {
          user: customer,
          userType: GlobalTexts.User.frontendUser,
        },
      });
      // Log customer data
      console.log("Customer Info:", customer);

      // Step 4: Handle successful login and navigation
      addToast(GlobalTexts.Auth.loginSuccess, "success");
      navigate("/myaccount/dashboard");
    } catch (error) {
      console.error("Login or Fetch error:", error);
      addToast(GlobalTexts.Auth.loginError || "Error during login", "error");

      // Optional: Remove any invalid token if an error occurs
      localStorage.removeItem("accessToken");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="py-25 bg-blue-100 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">User Login</h2>
              <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                  <InputField
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={handleChange}
                    error={errors[field.id]}
                  />
                ))}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Logging In..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

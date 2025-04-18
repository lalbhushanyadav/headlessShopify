import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import shopifyClient from "../../../api/shopifyClient";
import { useToast } from "../../../core/providers/ToastProvider";
import GlobalTexts from "../../../shared/Utils/Message";

const InputField = ({ id, label, type, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      validation: () =>
        !formData.firstName && GlobalTexts.Auth.firstNameMandatoryError,
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      validation: () =>
        !formData.lastName && GlobalTexts.Auth.lastNameMandatoryError,
    },
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
        if (formData.password.length < 8)
          return GlobalTexts.Auth.passwordLimitError;
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
      await shopifyClient.createCustomer(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );

      addToast(GlobalTexts.Auth.registrationSuccess, "success");
      navigate("/myaccount/login");
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error) {
      console.error("Registration error:", error);
      addToast(
        GlobalTexts.Auth.registrationError || "Error during registration",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          User Registration
        </h2>
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
            className={`w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

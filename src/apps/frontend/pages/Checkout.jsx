import React, { useState, useEffect } from "react";
import { useCart } from "../../../features/cart/context/CartContext";
import { useToast } from "../../../core/providers/ToastProvider";
import { useAuth } from "../../../features/auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../shared/components/Breadcrumbs";
import CustomerForm from "./CustomerForm";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const { addToast } = useToast();
  const { state: authState } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Breadcrumb />
      <div className="flex justify-center items-start min-h-screen p-6">
        <div className="flex w-full max-w-6xl gap-6">
          <CustomerForm
            cart={cart}
            dispatch={dispatch}
            authState={authState}
            addToast={addToast}
            navigate={navigate}
          />
          <OrderSummary cart={cart} dispatch={dispatch} addToast={addToast} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

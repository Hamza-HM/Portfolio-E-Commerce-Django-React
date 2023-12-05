import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makePay } from "../../../actions/cart";
import { load_addresses } from "../../../actions/profile";
import { getCoupon } from "../../../actions/cart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Container, Divider, Link } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import OrderItems from "./OrderItems";
import AddressSelector from "./AddressSelector";
import PaymentStatusMessage from "./PaymentStatusMessage";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51NnmFBBeVuYrOQ5OZ8WLFbmyUplR04WN4MriMwnIDc9PlvuNMFpEjH2blD9hc9UNPJSphr1gByBhQQak7AGJnVcc00nKqAHQJc"
);

const CheckoutForm = () => {
  // ... (rest of your code goes here, using the smaller components)
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;

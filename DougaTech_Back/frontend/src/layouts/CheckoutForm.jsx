import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Heading, Button, Box, Text, Alert, AlertIcon } from "@chakra-ui/react"; // Chakra UI components
import { makePay } from "../actions/cart";

const stripePromise = loadStripe(
  "pk_test_51NnmFBBeVuYrOQ5OZ8WLFbmyUplR04WN4MriMwnIDc9PlvuNMFpEjH2blD9hc9UNPJSphr1gByBhQQak7AGJnVcc00nKqAHQJc"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const paymentDetails = useSelector((state) => state.payment); // Assuming you have a reducer named 'payment'

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, token } = await stripe.createToken(cardElement);

      if (error) {
        console.error("There was an issue creating a token:", error);
        setLoading(false);
      } else {
        const { billing, shipping } = defaultaddresses; // You need to define defaultaddresses
        dispatch(makePay({ token, billing, shipping }));
        setLoading(false);
      }
    } catch (error) {
      console.error("There was an error:", error);
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Text as="h2" mb={4}>
        Would you like to complete your purchase?
      </Text>
      <Box
        borderWidth="1px"
        p={4}
        borderRadius="md"
        boxShadow="md"
        transition="transform 0.5s, box-shadow 0.5s"
        _hover={{
          transform: "translateY(-5px)",
          boxShadow: "lg",
          cursor: "pointer",
        }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Box mb={4}>
            <CardElement />
          </Box>
          {paymentDetails.success && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              Payment Successful. Go to your <b>Profile</b> to see your order
              delivery status.
            </Alert>
          )}
          <Button
            isLoading={loading}
            disabled={loading && !stripe}
            onClick={(e) => handleSubmit(e)}
            colorScheme="blue"
          >
            Pay
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CheckoutForm;

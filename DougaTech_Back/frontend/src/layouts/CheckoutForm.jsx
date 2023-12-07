import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Box, Text, Alert, AlertIcon } from "@chakra-ui/react"; // Chakra UI components
import { makePay } from "../actions/cart";
import { paymentResetFields } from "../reducers/payment";

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
        setLoading(false);
      } else {
        dispatch(makePay({ token }));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

useEffect(() => {

  return () => {
    dispatch(paymentResetFields());
  }
}, [])

  return (
    <Box p={4}>
      {paymentDetails?.success && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          Payment Successful <br /> {paymentDetails.detail}
        </Alert>
      )}
      {paymentDetails?.error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          Payment Failed <br /> {paymentDetails.payments.errorMessage}
        </Alert>
      )}
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

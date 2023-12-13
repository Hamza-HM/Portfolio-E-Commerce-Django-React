import { useEffect } from "react";
import { Box, Grid, Heading, Button, Icon } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OrderItems from "../../layouts/OrderItems";
import CouponForm from "../../layouts/CouponForm";
import AddressSelector from "../../layouts/AddressSelector";
import CheckoutForm from "../../layouts/CheckoutForm";
// import CheckoutForm from "../../layouts/CheckoutForm";

const Checkout = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state?.auth);

  const stripePromise = loadStripe(
    "pk_test_51NnmFBBeVuYrOQ5ODutL5KZNQ0VRDFMeCM1czYU3C5D0ZApYKjDBKpda3Eg6hSllE2uF66NP6Emnyz5avKxhebNA00M2rnz7Zi"
  );

  // Function to handle placing the order
  const handlePlaceOrder = () => {
    // Logic to place the order
    // Perform actions like payment processing, order placement, etc.
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Box
        bgGradient="linear(to-r, teal.500, blue.500)"
        color="white"
        py={20}
        textAlign="center"
        
        >
        {/* Hero Section */}
        <Heading as="h1" mb={4} fontSize="4xl">
          Checkout Now
        </Heading>
        <p>Complete your purchase</p>
      </Box>
      <Grid templateColumns="2fr 1fr" m="5" gap={10}>
        {/* Left Side */}
        <Box>
          <Heading as="h3" mt={8} mb={4} fontSize="xl">
            Address Information
          </Heading>
          <AddressSelector />
          <Link to="/profile">
            <Button>Update Address</Button>
          </Link>
          <Heading as="h3" mt={8} mb={4} fontSize="xl">
            Payment:
          </Heading>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Box>

        {/* Right Side */}
        <Box>
          <Heading as="h2" mb={4} fontSize="xl">
            Order Summary
          </Heading>
          {/* Display  in cart */}
          <OrderItems />
          <CouponForm />

          {/* Place Order */}
          <Box mt={8}>
            {/* Display other order details */}
            {/* ... */}
            <Button
              colorScheme="green"
              mb={4}
              w="100%"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
            <Box textAlign="center">
              {/* Phone and Email icons */}
              <Icon as={FaPhone} mr={2} cursor="pointer" />
              <Icon as={FaEnvelope} cursor="pointer" />
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Checkout;

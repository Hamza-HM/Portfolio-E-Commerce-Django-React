import { useState } from "react";
import {
  Box,
  Grid,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaPhone, FaEnvelope } from "react-icons/fa";

// Mock products data
const products = [
  { id: 1, name: "Product 1", price: 20, quantity: 2 },
  { id: 2, name: "Product 2", price: 30, quantity: 1 },
  // Add more products as needed
];

const Checkout = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  // Other state variables for form data

  // Function to handle applying the discount code
  const handleApplyDiscount = () => {
    // Logic to apply the discount code
    // Update state or perform actions accordingly
  };

  // Function to handle placing the order
  const handlePlaceOrder = () => {
    // Logic to place the order
    // Perform actions like payment processing, order placement, etc.
  };

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
      <Grid templateColumns="2fr 1fr" m="5">
        {/* Left Side */}
        <Box>
          <Heading as="h2" mb={4} fontSize="xl">
            Shipping Information
          </Heading>
          {/* Form for shipping information */}
          <FormControl>
            {/* Shipping form fields */}
            {/* ... */}
            <Button variant="link" mt={4}>
              Billing address same as shipping
            </Button>
          </FormControl>

          <Heading as="h3" mt={8} mb={4} fontSize="xl">
            Shipping Method
          </Heading>
          {/* Radio buttons for shipping methods */}
          <RadioGroup
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
          >
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Radio value="standard">Standard Shipping</Radio>
              <Radio value="express">Express Shipping</Radio>
            </Grid>
          </RadioGroup>

          <Heading as="h3" mt={8} mb={4} fontSize="xl">
            Payment Information
          </Heading>
          {/* Radio buttons for payment methods */}
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Radio value="creditCard">Credit Card</Radio>
              <Radio value="paypal">PayPal</Radio>
            </Grid>
          </RadioGroup>
          {/* Payment form fields */}
          {/* ... */}
        </Box>

        {/* Right Side */}
        <Box>
          <Heading as="h2" mb={4} fontSize="xl">
            Order Summary
          </Heading>
          {/* Display products in cart */}
          {products.map((product) => (
            <Grid key={product.id} templateColumns="1fr 1fr" gap={4} mb={4}>
              <Box>{product.name}</Box>
              <Box>Quantity: {product.quantity}</Box>
              {/* Display other product details */}
            </Grid>
          ))}
          {/* Discount Code input */}
          {/* Subtotal */}
          {/* Shipping Cost */}
          {/* Discount Percentage */}
          {/* Order Total */}
          <FormControl>
            <FormLabel>Discount Code</FormLabel>
            <Grid templateColumns="2fr 1fr" gap={4} alignItems="center">
              <Input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button colorScheme="blue" onClick={handleApplyDiscount}>
                Apply
              </Button>
            </Grid>
          </FormControl>

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

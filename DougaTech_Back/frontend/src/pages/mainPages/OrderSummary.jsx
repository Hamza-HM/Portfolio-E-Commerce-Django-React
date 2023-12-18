import { useEffect } from "react";
import {
  Text,
  Center,
  Box,
  Heading,
  HStack,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateItemCartQuantity } from "../../actions/cart";
import { addToCart } from "../../actions/products";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
const OrderSummary = () => {
  const orderItems = useSelector(
    (state) => state.cart.shoppingCart?.order_items
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state?.auth);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (orderItems) {
      totalPrice = orderItems.reduce((acc, orderItem) => {
        return acc + orderItem.final_price;
      }, 0);
    }
    return totalPrice;
  };

  const renderVariations = (variations) => {
    let variationString = ""; // Change to an empty string
    if (orderItems) {
      variationString = variations.reduce((acc, variation) => {
        return `${acc ? acc + ", " : ""}${variation.value}`;
      }, "");
    }
    return variationString || "No Variations"; // Handle case when no variations exist
  };

  const FormatVariations = (variations) => {
    if (variations) {
      const formatedVariations = variations.map((variation) => {
        return variation.id;
      });
      return formatedVariations;
    }
    return [];
  };

  const handleAddQuantity = (slug, variations) => {
    const formatedVariations = FormatVariations(variations);
    console.log(slug, formatedVariations);
    if (slug && formatedVariations) {
      dispatch(addToCart({ slug, variations: formatedVariations }));
    }
  };

  const handleDecreaseQuantity = (slug, variations) => {
    const formatedVariations = FormatVariations(variations);
    if (slug && formatedVariations) {
      dispatch(
        updateItemCartQuantity({ slug, variations: formatedVariations })
      );
    }
  };

  const handleRemoveItem = (itemID) => {
    if (itemID) {
      dispatch(removeCartItem({ itemID }));
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Box bg="blue.500" color="white" textAlign="center" pb="60px" pt="100px">
        <Heading as="h1" fontSize="4xl" mb={4}>
          Order Summary
        </Heading>
        {/* Your slogan or additional information here */}
      </Box>
      <Center pt="55px">
        <Stack direction="column" spacing={4} alignItems="center" w="full">
          {orderItems &&
            orderItems.map((orderItem, i) => (
              <Box
                key={i}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                w="full"
                maxW="500px"
                p={4}
              >
                <Heading as="h3" size="md" mb={2}>
                  {orderItem.item.title}
                </Heading>
                <Box mb={2}>
                  {orderItem?.item_variations.length > 0
                    ? renderVariations(orderItem.item_variations)
                    : "No Variations"}
                </Box>
                <HStack spacing={2} mb={2}>
                  <Box fontSize="30px" px="10px" color="blue">
                    {orderItem.quantity}
                  </Box>
                  <FaPlusSquare
                    fontSize="25px"
                    border="1px solid grey"
                    p="1px"
                    _hover={{ cursor: "pointer" }}
                    onClick={() =>
                      handleAddQuantity(
                        orderItem.item.slug,
                        orderItem.item_variations
                      )
                    }
                  />
                  <FaMinusSquare
                    fontSize="25px"
                    border="1px solid grey"
                    p="1px"
                    _hover={{ cursor: "pointer" }}
                    onClick={() =>
                      handleDecreaseQuantity(
                        orderItem.item.slug,
                        orderItem.item_variations
                      )
                    }
                  />
                </HStack>
                <HStack mb={2} fontSize='30px'>
                  <Box as="h3" fontWeight='bold'>Price:</Box>
                  <Text>{orderItem.item.price} DA</Text>
                </HStack>
                <HStack mb={2} fontSize='30px'>
                <Box as="h3" fontWeight='bold'>Total Price:</Box>
                  <Text>{orderItem.final_price} DA</Text>
                </HStack>
                <Button onClick={() => handleRemoveItem(orderItem.id)}>
                  Remove
                </Button>
              </Box>
            ))}
          <Box textAlign="center">
            <Button onClick={() => navigate("/checkout")}>
              Checkout - Total: {calculateTotalPrice()} DA
            </Button>
          </Box>
        </Stack>
      </Center>
    </>
  );
};

export default OrderSummary;

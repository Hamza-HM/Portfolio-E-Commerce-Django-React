import React from "react";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const OrderItems = () => {
  const { shoppingCart } = useSelector((state) => state?.cart);
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="blue.500" color="white" py={10} textAlign="center" borderRadius='md'>
        <Heading as="h1" fontSize="4xl" mb={4}>
          Order Items
        </Heading>
      </Box>

      {/* Order Items */}
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4} mt={8}>
        {shoppingCart?.order_items &&
          shoppingCart.order_items.map((orderItem, i) => (
            <GridItem key={i} mb={3}>
              <HStack>
                <Image
                  w="50px"
                  src={`http://localhost:8000/${orderItem.item.image}`}
                  alt={orderItem.item.title}
                />
                <Box>
                  <Text as="h3">
                    {orderItem.quantity} x {orderItem.item.title}
                  </Text>
                  <Text>${orderItem.item.price}</Text>
                </Box>
              </HStack>
            </GridItem>
          ))}
      </Grid>

      {/* Total and Coupon */}
      <Box mt={4} textAlign="right">
        <Heading fontSize={25}>
          Total: {shoppingCart?.total} DA
        </Heading>
        {shoppingCart?.coupon && (
          <Heading fontSize={15} color="green" mt={2}>
            {shoppingCart.coupon.amount * 100}% Applied
          </Heading>
        )}
      </Box>
    </Box>
  );
};

export default OrderItems;

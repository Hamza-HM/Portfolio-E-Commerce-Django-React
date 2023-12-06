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
    <Grid templateColumns="1fr" gap={4}>
      {shoppingCart?.order_items &&
        shoppingCart.order_items.map((orderItem, i) => (
          <GridItem key={i} my="3">
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
      <Heading ml="auto" fontSize={25}>
        Total: {shoppingCart?.total} DA
      </Heading>
      {shoppingCart?.coupon && (
        <Heading ml="auto" fontSize={15} color="green">
          {shoppingCart.coupon.amount * 100}% Applied
        </Heading>
      )}
    </Grid>
  );
};

export default OrderItems;

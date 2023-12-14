import { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Box,
  Heading,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import { removeCartItem, updateItemCartQuantity } from "../../actions/cart";
import { addToCart } from "../../actions/products";

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
    <Center pt='55px'>
      <Box my="5">
        <Heading my="5" fontSize="lg" textAlign="center">
          Order Summary
        </Heading>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Item</Th>
                <Th isNumeric>Variations</Th>
                <Th>Quantity</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Total Price</Th>
                <Th isNumeric>Remove </Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderItems &&
                orderItems.map((orderItem, i) => (
                  <Tr key={i}>
                    <Td>{orderItem.item.title}</Td>
                    <Td>
                      {orderItem?.item_variations.length > 0 ? (
                        <div>{renderVariations(orderItem.item_variations)}</div>
                      ) : (
                        <>No Variations</>
                      )}
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <div>{orderItem.quantity}</div>
                        <AddIcon
                          fontSize="10px"
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
                        <MinusIcon
                          fontSize="10px"
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
                    </Td>
                    <Td isNumeric>{orderItem.item.price} DA</Td>
                    <Td isNumeric>{orderItem.final_price} DA</Td>
                    <Td isNumeric>
                      <Button onClick={() => handleRemoveItem(orderItem.id)}>
                        <DeleteIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th isNumeric colSpan={5}>
                  Total: {calculateTotalPrice()}DA
                </Th>
                <Th isNumeric>
                  <Button onClick={() => navigate("/checkout")}>
                    Checkout
                  </Button>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Center>
  );
};

export default OrderSummary;

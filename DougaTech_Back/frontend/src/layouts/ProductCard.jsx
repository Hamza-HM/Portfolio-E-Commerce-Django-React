import {
  Image,
  CardFooter,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Box,
  HStack, // Import Box from Chakra UI
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const ProductCard = ({
  id,
  name,
  category,
  label,
  discountPrice,
  image,
  description,
  price,
}) => {
  const hasDiscount = discountPrice && discountPrice < price;

  const extractFirstTwoLines = (text) => {
    const lines = text.split("\n");
    return lines.slice(0, 2).join("\n");
  };

  const navigate = useNavigate();

  const truncatedDescription = extractFirstTwoLines(description);

  return (
    <Card
      maxW={{ base: "300px", sm: "400px", md: "400px", lg: "450px" }} // Set different max widths based on screen sizes
      minW={{ base: "400px" }}
      maxH="1000px" // Set a maximum height for the card
      display="flex"
      justifyContent="center"
      mx="auto"
    >
      <CardBody>
        <Image
          onClick={() => navigate(`/products/${id}`)}
          cursor="pointer"
          src={image}
          alt={name}
          borderRadius="lg"
          maxW="100%"
          h="300px" // Set a fixed height for the image
          objectFit="cover" // Ensure the image covers the specified height
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text fontSize="sm" color="gray.500">
            Category: {category}
          </Text>
          <Box
            fontSize="sm"
            backgroundColor="blue.200"
            display="inline-flex"
            p="2"
            borderRadius="md"
            alignItems="center"
            maxWidth="fit-content"
          >
            {label}
          </Box>
          <Text noOfLines={1} overflow="hidden">
            {truncatedDescription}
          </Text>
          <HStack>
            {hasDiscount ? (
              <>
                <Text fontSize="2xl" textDecoration="line-through" mr="2">
                  ${price}
                </Text>
                <Text fontSize="2xl">${price - discountPrice}</Text>
              </>
            ) : (
              <Text fontSize="2xl">${price}</Text>
            )}
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

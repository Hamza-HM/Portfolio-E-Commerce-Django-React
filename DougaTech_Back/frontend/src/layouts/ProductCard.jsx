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
  // description,
  price,
  variationsExist,
  zIndex,
}) => {
  const hasDiscount = discountPrice && discountPrice < price;
  const navigate = useNavigate();

  // const extractFirstTwoLines = (text) => {
  //   const lines = text.split("\n");
  //   return lines.slice(0, 2).join("\n");
  // };

  // const truncatedDescription = extractFirstTwoLines(description);

  return (

    <Card
      maxW='300px' 
      minW={{ base: "300px" }}
      maxH="1000px"
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
          h="200px" // Set a fixed height for the image
          objectFit="cover" // Ensure the image covers the specified height
        />
        <Stack mt="6" spacing="3">
          <HStack display='flex' justifyContent='space-between' textAlign='center'>

          <Heading size="md">{name}</Heading>
          <Text fontSize="sm" color="gray.500">
            Category: {category}
          </Text>
          </HStack>
          <Box
            fontSize=".5rem"
            backgroundColor="blue.200"
            display="inline-flex"
            p="2"
            borderRadius="md"
            alignItems="center"
            maxWidth="fit-content"
          >
            {label}
          </Box>

          <HStack>
            {hasDiscount ? (
              <>
                <Text fontSize="2xl" textDecoration="line-through" mr="2">
                  {price}DA
                </Text>
                <Text fontSize="2xl">{price - discountPrice}DA</Text>
              </>
            ) : (
              <Text fontSize="2xl">{price}DA</Text>
            )}
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {variationsExist ? (
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>

        ): (
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
        )}
      </CardFooter>
    </Card>

  );
};

export default ProductCard;

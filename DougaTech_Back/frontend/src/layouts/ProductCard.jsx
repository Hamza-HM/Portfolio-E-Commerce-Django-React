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
  HStack,
  useColorMode, // Import Box from Chakra UI
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../actions/products";
import {useSelector} from 'react-redux'

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
  slug,
}) => {
  const {isAuthenticated} = useSelector(state => state.auth)
  const hasDiscount = discountPrice && discountPrice < price;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!isAuthenticated) navigate('/login')
    console.log(slug, [])
    dispatch(addToCart({ slug, variations: [] }));
  };
  const { colorMode } = useColorMode();
  const cartBgColor = {
    light: "gray.200", // Light mode background color
    dark: "gray.800", // Dark mode background color
  };

  const boxShadow = {
    light: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Light mode shadow
    dark: "0px 4px 6px rgba(255, 255, 255, 0.1)", // Dark mode shadow
  };

  const boxShadowHover = {
    light: "0px 8px 12px rgba(0, 0, 0, 0.2)", // Light mode shadow on hover
    dark: "0px 8px 12px rgba(255, 255, 255, 0.2)", // Dark mode shadow on hover
  };

  // const extractFirstTwoLines = (text) => {
  //   const lines = text.split("\n");
  //   return lines.slice(0, 2).join("\n");
  // };

  // const truncatedDescription = extractFirstTwoLines(description);

  return (
    <Card
      maxW={{ base: "280px", md: "300px" }}
      minW={{ base: "280px" }}
      maxH="1000px"
      display="flex"
      justifyContent="center"
      mx="auto"
      bg={cartBgColor[colorMode]}
      boxShadow={boxShadow[colorMode]}
      _hover={{
        shadow: boxShadowHover[colorMode],
        transition: "box-shadow 0.3s ease-in-out",
      }}
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
          <HStack
            display="flex"
            justifyContent="space-between"
            textAlign="center"
          >
            <Heading size="md">{name}</Heading>
            <Text fontSize="sm" color="gray.500">
              {category}
            </Text>
          </HStack>
          <Box
            fontSize=".8rem"
            backgroundColor={colorMode === "dark" ? "blue.800" : "blue.200"}
            display="inline-flex"
            p="2"
            borderRadius="md"
            alignItems="center"
            maxWidth="fit-content"
          >
            {label}
          </Box>

          <HStack justifyContent="center" fontFamily={"fantasy"} color="red">
            {hasDiscount ? (
              <>
                <Text
                  fontSize="2xl"
                  textDecoration="line-through"
                  textDecorationColor="white"
                  mr="2"
                >
                  {price} DA
                </Text>
                <Text fontSize="2xl">{price - discountPrice} DA</Text>
              </>
            ) : (
              <Text fontSize="2xl">{price} DA</Text>
            )}
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justifyContent="center">
        {variationsExist ? (
          <Button
            variant="solid"
            colorScheme="blue"
            w="full"
            onClick={() => navigate(`/products/${id}`)}
          >
            Buy now
          </Button>
        ) : (
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => navigate(`/products/${id}`)}
            >
              Buy now
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </ButtonGroup>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

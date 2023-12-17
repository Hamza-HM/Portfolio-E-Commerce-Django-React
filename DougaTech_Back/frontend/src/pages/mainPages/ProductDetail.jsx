import { useEffect, useState } from "react";
import {
  Image,
  Box,
  Heading,
  Text,
  Stack,
  Divider,
  Button,
  useColorMode,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import { addToCart, loadProduct } from "../../actions/products";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import VariationsForm from "../../layouts/VariationsForm";
import { fetchCart } from "../../actions/cart";
import ProductHero from "../../layouts/products page/ProductHero";

const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector((state) => state.products.productDetail?.product);
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const navigate = useNavigate();

  const handleFetchCart = () => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) navigate("/login");
    dispatch(addToCart({ slug, variations }));
  };

  useEffect(() => {
    dispatch(loadProduct({ id }));
  }, []);

  if (!product) {
    return null; // Add loading or error handling here if needed
  }
  const {
    title,
    price,
    discount_price,
    category,
    label,
    description,
    image,
    slug,
    variations,
  } = product;

  const hasDiscount = discount_price && discount_price < price;
  const images = []; // Add your images data here
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
  const renderWithOrWithoutVariations = () => {
    if (variations && variations.length > 0) {
      return <VariationsForm variations={variations} slug={slug} />;
    } else {
      return (
        <>
          <Divider my="4" />
          <Button
            w="full"
            variant="solid"
            colorScheme="blue"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <ProductHero />
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={6}
        py="100px"
        px="10px"
      >
        <GridItem colSpan={{ base: "auto", md: 2 }} maxW="900px">
          <Box>
            <Image
              src={selectedImage || image}
              alt="Product"
              borderRadius="md"
            />
            <Stack spacing={4} mt={4}>
              {images &&
                images.map((img) => (
                  <Image
                    key={img}
                    src={img}
                    alt="Product Thumbnail"
                    boxSize="50px"
                    onClick={() => handleImageClick(img)}
                    cursor="pointer"
                    borderRadius="md"
                    boxShadow="md"
                  />
                ))}
            </Stack>
          </Box>
        </GridItem>
        <GridItem colSpan="auto">
          <Box
            p="4"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
            bg={cartBgColor[colorMode]}
            boxShadow={boxShadow[colorMode]}
            _hover={{
              shadow: boxShadowHover[colorMode],
              transition: "box-shadow 0.3s ease-in-out",
            }}
            cursor="pointer"
          >
            <Stack spacing="4">
              <Heading size="lg">{title}</Heading>
              <HStack color="red" fontFamily={"fantasy"}>
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
                    <Text fontSize="2xl">
                      {price - price * discount_price} DA
                    </Text>
                  </>
                ) : (
                  <Text fontSize="2xl">{price} DA</Text>
                )}
              </HStack>
              <Text fontSize="md" color="gray.600">
                Category: {category}
              </Text>
              <Text
                fontSize=".8rem"
                backgroundColor={colorMode === "dark" ? "blue.800" : "blue.200"}
                display="inline-flex"
                p="2"
                borderRadius="md"
                alignItems="center"
                maxWidth="fit-content"
              >
              {label}
              </Text>
              S
              <Divider />
              <Text fontSize="md">{description}</Text>
            </Stack>
            {renderWithOrWithoutVariations()}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default ProductDetail;

import { useEffect, useState } from "react";
import {
  Image,
  Box,
  Heading,
  Text,
  Stack,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Select,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import { addToCart, loadProduct } from "../../actions/products";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VariationsForm from "../../layouts/VariationsForm";

import { fetchCart } from "../../actions/cart";

const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector((state) => state.products.productDetail?.product);
  const { isAuthenticated } = useSelector(
    (state) => state?.auth
  );
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleFetchCart = () => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  };

  const handleAddToCart = () => {
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

  const renderWithOrWithoutVariations = () => {
    if (variations && variations.length > 0) {
      return <VariationsForm variations={variations} slug={slug} />;
    } else {
      return (
        <>
          <Divider my="4" />
          <Stack direction="row" spacing={4}>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={handleFetchCart}
            >
              Buy Now
            </Button>
          </Stack>
        </>
      );
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} pt='55px' px='10px'>
      <GridItem colSpan={1}>
        <Box maxW="400px">
          <Image src={selectedImage || image} alt="Product" />
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
      <GridItem colSpan={1}>
        <Box
          maxW="600px"
          p="4"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
        >
          <Stack spacing="4">
            <Heading size="lg">{title}</Heading>
            <HStack>
              {hasDiscount ? (
                <>
                  <Text fontSize="2xl" textDecoration="line-through" mr="2">
                    ${price}
                  </Text>
                  <Text fontSize="2xl">${price - price * discount_price}</Text>
                </>
              ) : (
                <Text fontSize="2xl">${price}</Text>
              )}
            </HStack>
            <Text fontSize="md" color="gray.600">
              Category: {category}
            </Text>
            <Text fontSize="md" color="gray.600">
              Label: {label}
            </Text>
            S
            <Divider />
            <Text fontSize="md">{description}</Text>
          </Stack>
          {renderWithOrWithoutVariations()}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ProductDetail;

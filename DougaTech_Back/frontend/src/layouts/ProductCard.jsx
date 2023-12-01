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
  Box, // Import Box from Chakra UI
} from "@chakra-ui/react";

const ProductCard = ({
  name,
  category,
  label,
  discountPrice,
  image,
  description,
  price,
}) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={image} alt={name} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text fontSize="sm" color="gray.500">
            Category: {category}
          </Text>
          {/* Styling for the label */}
          <Box
            fontSize="sm"
            backgroundColor="blue.200"
            display="inline-flex" // Set display to inline-flex
            p="2" // Padding for the label
            borderRadius="md" // Rounded corners
            alignItems="center" // Align content vertically
            maxWidth="fit-content" // Set minimum width to fit content
          >
            {label}
          </Box>
          <Text>{description}</Text>
          <Text fontSize="2xl">${price}</Text>
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

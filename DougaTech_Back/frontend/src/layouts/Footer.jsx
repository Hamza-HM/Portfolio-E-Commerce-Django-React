import { Box, VStack, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.200", dark: "gray.800" };
  const textColor = { light: "gray.500", dark: "gray.100" };

  return (
    <>
      <Box
        as="footer"
        py={6}
        bg={bgColor[colorMode]}
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        alignItems="center"
        justifyContent="center"
        textAlign={{ base: "center", lg: "start" }}
      >
        <VStack
          px="100px"
          alignItems={{ base: "center", lg: "flex-start" }}
          spacing={5}
          pt="5px"
        >
          <Heading>Douga</Heading>
          <Link to="/">some address street stuff number</Link>
          <Link to="/products">Algeria, Blida/Oran</Link>
          <Link to="/about">location</Link>
          <Link to="#">Something else</Link>
        </VStack>
        <VStack
          px="100px"
          alignItems={{ base: "center", lg: "flex-start" }}
          spacing={5}
          pt="5px"
        >
          <Heading>Pages</Heading>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="#">Contact</Link>
        </VStack>
        <VStack
          px="100px"
          alignItems={{ base: "center", lg: "flex-start" }}
          spacing={5}
          pt="5px"
        >
          <Heading>Contact Us</Heading>
          <Link to="/">+213 654 789 21</Link>
          <Link to="/products">Facebook</Link>
          <Link to="/about">Instagram</Link>
          <Link to="#">Tiktok</Link>
        </VStack>
      </Box>
      <Box my="10px" textAlign="center">
        <Link to="https://www.linkedin.com/in/hamza-hed-messaoud/">Hamza</Link>
      </Box>
    </>
  );
};

export default Footer;

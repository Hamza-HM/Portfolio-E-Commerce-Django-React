import {
  Box,
  VStack,
  Container,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Box
        as="footer"
        py={6}
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        alignItems="center"
        justifyContent="center"
        textAlign={{ base: "center", lg: "start" }}
        mx={{base: '', lg: '8%', xl:'12%'}}
      >
        <VStack alignItems="center" spacing={5}>
          <VStack alignItems={{ base: "center", lg: "flex-start" }} spacing={5}>
            <Heading>Douga</Heading>
            <Link to="/">some address street stuff number</Link>
            <Link to="/products">Algeria, Blida/Oran</Link>
            <Link to="/about">location</Link>
            <Link to="#">Something else</Link>
          </VStack>
        </VStack>
        <VStack alignItems="center" spacing={5}>
          <VStack alignItems={{ base: "center", lg: "flex-start" }} spacing={5}>
            <Heading>Pages</Heading>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="#">Contact</Link>
          </VStack>
        </VStack>
        <VStack alignItems="center" spacing={5}>
          <VStack alignItems={{ base: "center", lg: "flex-start" }} spacing={5}>
            {" "}
            <Heading>Contact Us</Heading>
            <Link to="/">+213 654 789 21</Link>
            <Link to="/products">Facebook</Link>
            <Link to="/about">Instagram</Link>
            <Link to="#">Tiktok</Link>
          </VStack>
        </VStack>
      </Box>
      <Box my="10px" textAlign="center">
        <Link to="https://www.linkedin.com/in/hamza-hed-messaoud/">Hamza</Link>
      </Box>
    </>
  );
};

export default Footer;

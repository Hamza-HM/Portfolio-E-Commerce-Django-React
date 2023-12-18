import { Box, Image, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"; // Assuming you're using React Router

const Page404 = () => {
  return (
    <Box
      textAlign="center"
      height="80vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      color="white"
    >
      <Image src="https://img.freepik.com/vecteurs-libre/oops-erreur-404-illustration-concept-robot-casse_114360-1932.jpg?w=826&t=st=1702930397~exp=1702930997~hmac=2715c61764e169c70600e8981eab37d9d4e98f766f9ed8aea798a40eda648816" />
      {/* <Heading as="h1" fontSize="4xl" mb="4">
        404 - Page Not Found
      </Heading>
      <Text fontSize="xl" mb="6">
        Oops! The page you're looking for doesn't exist.
      </Text> */}
      <Button
      
        as={RouterLink}
        to="/"
        colorScheme="blue"
        mt='5'
        size="md"
        px="4"
        py="2"
        borderRadius="md"
        _hover={{ bg: "white", color: "blue.500" }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default Page404;

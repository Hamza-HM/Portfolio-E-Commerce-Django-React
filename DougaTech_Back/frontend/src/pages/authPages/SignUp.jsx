import { Box, useColorMode } from "@chakra-ui/react";

const SignUp = () => {
  const { colorMode } = useColorMode();
  return <Box
  w="200px" h="15vh" bg={colorMode === 'light'? 'gray.500': 'gray.200'} boxShadow="lg" rounded="md" />;
};

export default SignUp;

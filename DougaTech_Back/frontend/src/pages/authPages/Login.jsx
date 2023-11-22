import React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { FaFacebook } from "react-icons/fa"; // Importing Facebook and Google icons from react-icons/fa
import {FcGoogle } from 'react-icons/fc'
const Login = () => {
  const { colorMode } = useColorMode();

  const handleFacebookLogin = () => {
    // Implement Facebook login functionality
  };

  const handleGoogleLogin = () => {
    // Implement Google login functionality
  };

  return (
    <Center>
      <Box
        maxW="500px"
        w="full"
        p={5}
        className={colorMode === "light" ? "mdx-prose" : ""}
      >
        <form action="submit">
          <Stack spacing={2}>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<EmailIcon />} />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  aria-label="Email"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<LockIcon />} />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  aria-label="Password"
                />
              </InputGroup>
            </FormControl>

            <Button
              boxShadow="sm"
              type="submit"
              colorScheme='teal'
              // _hover={{ boxShadow: "md" }}
              // _active={{ boxShadow: "lg" }}
            >
              Submit
            </Button>

            {/* Facebook */}
            <Button
              w={"full"}
              colorScheme={"facebook"}
              leftIcon={<FaFacebook />}
              onClick={handleFacebookLogin} // Add onClick handler for Facebook login
            
            >
              <Center>
                <Text>Continue with Facebook</Text>
              </Center>
            </Button>

            {/* Google */}
            <Button
              w={"full"}
              variant={"outline"}
              leftIcon={<FcGoogle />}
              onClick={handleGoogleLogin} // Add onClick handler for Google login
            >
              <Center>
                <Text>Sign in with Google</Text>
              </Center>
            </Button>

            <FormControl>
              <FormHelperText textAlign="center">
                Welcome Home
                <br />
                🏡
              </FormHelperText>
            </FormControl>
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default Login;

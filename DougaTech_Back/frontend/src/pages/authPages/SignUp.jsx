import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { EmailIcon, InfoIcon, LockIcon } from "@chakra-ui/icons";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const { colorMode } = useColorMode();

  const handleFacebookSignUp = () => {
    // Implement Facebook sign-up functionality
  };

  const handleGoogleSignUp = () => {
    // Implement Google sign-up functionality
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
                <InputLeftElement children={<InfoIcon />} />
                <Input
                  type="name"
                  name="first_name"
                  placeholder="First Name"
                  aria-label="First Name"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<InfoIcon />} />
                <Input
                  type="name"
                  name="last_name"
                  placeholder="Last Name"
                  aria-label="Last Name"
                />
              </InputGroup>
            </FormControl>
            <Divider spacing={3} borderColor="gray.500" />
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
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<LockIcon />} />
                <Input
                  type="password"
                  name="re_password"
                  placeholder="Confirm password"
                  aria-label="Confirm password"
                />
              </InputGroup>
            </FormControl>

            <Button
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              _active={{ boxShadow: "lg" }}
              type="submit"
            >
              Submit
            </Button>

            {/* Facebook */}
            <Button
              w={"full"}
              colorScheme={"facebook"}
              leftIcon={<FaFacebook />}
              onClick={handleFacebookSignUp} // Add onClick handler for Facebook sign-up
            >
              <Center>
                <Text>Continue with Facebook</Text>
              </Center>
            </Button>

            {/* Google */}
            <Button
              w={"full"}
              variant={"outline"}
              leftIcon={<FaGoogle />}
              onClick={handleGoogleSignUp} // Add onClick handler for Google sign-up
            >
              <Center>
                <Text>Sign in with Google</Text>
              </Center>
            </Button>

            <FormControl>
              <FormHelperText textAlign="center">
                We will never share your info!
                <br />
                🤐
              </FormHelperText>
            </FormControl>
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default SignUp;

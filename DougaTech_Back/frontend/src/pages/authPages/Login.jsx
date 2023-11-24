import React, { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { EmailIcon, InfoIcon, LockIcon } from "@chakra-ui/icons";
import { FaFacebook } from "react-icons/fa"; // Importing Facebook and Google icons from react-icons/fa
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};
const validationSchemas = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    // .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  const handleFacebookLogin = () => {
    // Implement Facebook login functionality
    console.log("facebook login");
  };

  const handleGoogleLogin = () => {
    // Implement Google login functionality
    console.log("google login");
  };
  const handleSubmit = (values, { setSubmitting }) => {
    // Implement Google login functionality
    if (values) {
      dispatch(login(values));
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <Center>
      <Box
        maxW="500px"
        w="full"
        p={5}
        className={colorMode === "light" ? "mdx-prose" : ""}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <InputGroup>
                      <InputLeftElement children={<InfoIcon />} />
                      <Input
                        {...field}
                        type="text"
                        placeholder="Email"
                        aria-label="Email"
                      />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <InputGroup>
                      <InputLeftElement children={<LockIcon />} />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                      />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button w="full" type="submit" isLoading={isSubmitting}>
                Submit
              </Button>
              <Button
                w="full"
                colorScheme="facebook"
                leftIcon={<FaFacebook />}
                onClick={handleFacebookLogin}
              >
                Continue with Facebook
              </Button>
              <Button
                w="full"
                variant="outline"
                leftIcon={<FcGoogle />}
                onClick={handleGoogleLogin}
              >
                Continue with Google
              </Button>
              <FormControl>
                <FormHelperText textAlign="center">
                  We will never share your info!
                  <br />
                  🤐
                </FormHelperText>
              </FormControl>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default Login;

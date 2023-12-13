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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialValues = {
  email: "",
  password: "",
};
const validationSchemas = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required"),
});

const Login = () => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, success } = useSelector(
    (state) => state?.auth
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values) {
      await dispatch(login(values));
      setSubmitting(false);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      const response = await axios.get(`
      ${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/auth/o/facebook/?redirect_uri=${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/facebook`);
      window.location.replace(response.data.authorization_url);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get(`
      ${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/auth/o/google-oauth2/?redirect_uri=${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/google`);
      window.location.replace(response.data.authorization_url);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <Center pt='55px' h='90vh'>
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
              {error && typeof error === "object" ? (
                Object.values(error).map((errorItem, index) => (
                  <Text key={index} textAlign="center" color="red" my="5">
                    {errorItem}
                  </Text>
                ))
              ) : (
                <Text textAlign="center" color="red" my="5">
                  {error}
                </Text>
              )}
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <InputGroup>
                      <InputLeftElement children={<EmailIcon />} />
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
                  <br />
                  Fogot password?{" "}
                  <Link to="/password-reset" style={{ color: "blue" }}>
                    Reset Password
                  </Link>
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

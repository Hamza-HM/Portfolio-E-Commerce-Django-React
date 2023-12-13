import { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
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
import axios from "axios";
import { EmailIcon, InfoIcon, LockIcon } from "@chakra-ui/icons";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";

const SignUp = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, success, error } = useSelector(
    (state) => state.auth
  );
  const initialValues = {
    // first_name: "",
    // last_name: "",

    username: "",
    email: "",
    password: "",
    re_password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("First Name is required"),
    // first_name: Yup.string().required("First Name is required"),
    // last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    re_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Implement your submit logic here
    if (values) {
      await dispatch(register(values));
      setSubmitting(false);
      if (success?.id) {
        resetForm();
      }
    }
  };

  const handleFacebookSignUp = async () => {
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

  const handleGoogleSignUp = async () => {
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
        h='100%'
        w="full"
        p={5}
        className={colorMode === "light" ? "mdx-prose" : ""}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
              {success?.id && (
                <Text textAlign="center" color="green" my="5">
                  Success, confirm your email please!
                </Text>
              )}

              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.first_name && form.touched.first_name
                    }
                  >
                    <InputGroup>
                      <InputLeftElement children={<InfoIcon />} />
                      <Input
                        {...field}
                        type="text"
                        placeholder="Username"
                        aria-label="Username"
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors.first_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* <Field name="first_name">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.first_name && form.touched.first_name
                    }
                  >
                    <InputGroup>
                      <InputLeftElement children={<InfoIcon />} />
                      <Input
                        {...field}
                        type="text"
                        placeholder="First Name"
                        aria-label="First Name"
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors.first_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="last_name">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.last_name && form.touched.last_name}
                  >
                    <InputGroup>
                      <InputLeftElement children={<InfoIcon />} />
                      <Input
                        {...field}
                        type="text"
                        placeholder="Last Name"
                        aria-label="Last Name"
                      />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.last_name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field> */}

              <Divider spacing={3} borderColor="gray.500" />

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
                        type="email"
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

              <Field name="re_password">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.re_password && form.touched.re_password
                    }
                  >
                    <InputGroup>
                      <InputLeftElement children={<LockIcon />} />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm password"
                        aria-label="Confirm password"
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors.re_password}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                type="submit"
                w="full"
                isLoading={isSubmitting}
                boxShadow="sm"
              >
                Submit
              </Button>

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

              <Button
                w={"full"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
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
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default SignUp;

import * as Yup from "yup";
import {
  Center,
  Box,
  Input,
  Button,
  useColorMode,
  FormControl,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { Field, Formik, Form } from "formik";
import { passwordReset } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PasswordReset = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { isAuthenticated, success, error } = useSelector(
    (state) => state?.auth
  );

  const dispatch = useDispatch();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email field is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values) {
      await dispatch(passwordReset(values));
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Center h="70vh">
      <Box
        maxW="500px"
        w="full"
        py="5"
        className={colorMode === "light" ? "mdx-prose" : ""}
      >
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
        {success && (
          <Text textAlign="center" color="green" my="5">
            {success}
          </Text>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="email">
                {({ form, field }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <Input
                      {...field}
                      type="text"
                      aria-label="Email"
                      placeholder="Email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button type="submit" isLoading={isSubmitting} w="full">
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default PasswordReset;

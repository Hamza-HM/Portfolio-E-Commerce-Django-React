import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { LockIcon } from "@chakra-ui/icons";
import { resetPasswordConfirmation } from "../../actions/auth";
const PasswordResetConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const { isAuthenticated, success, error } = useSelector(
    (state) => state?.auth
  );

  const initialValues = {
    password: "",
    re_password: "",
  };
  const validationSchemas = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    re_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async ({ password, re_password }, { setSubmitting }) => {
    if (uid && token && password && re_password) {
      await dispatch(
        resetPasswordConfirmation({ uid, token, password, re_password })
      );
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <Center h="50vh">
      <Box maxW="500px" w="full">
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
              {success && (
                <Text textAlign="center" color="green" my="5">
                  {success}
                </Text>
              )}

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
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default PasswordResetConfirm;

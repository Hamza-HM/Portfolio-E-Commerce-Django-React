import React from "react";
import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  Heading,
  Button,
  Flex,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

const NewsLetter = () => {
  const initialState = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Enter email please!").email("Invalid email"),
  });

  const handleSubmit = (values, actions) => {
    // Handle form submission logic here
    console.log(values); // For example, you can log the form values
  };

  return (
    <Center>
      <Flex
        flexWrap="wrap"
        justifyContent="space-evenly"
        alignItems="center"
        width="100%"
        maxWidth="100%" // Adjust as needed
        marginX="auto"
      >
        <Box textAlign="center" flexBasis={{ base: "100%", md: "50%" }}>
          <Heading>Newsletter</Heading>
        </Box>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexBasis={{ base: "100%", md: "50%" }}
        >
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form style={{ display: "flex" }}>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.email && form.touched.email}
                      marginBottom="1rem"
                    >
                      <Input
                        {...field}
                        type="email"
                        aria-label="Email"
                        placeholder="Email"
                      />
                      {/* <FormErrorMessage>{form.errors.email}</FormErrorMessage> */}
                    </FormControl>
                  )}
                </Field>
                <Button type="submit" isLoading={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
      </Flex>
    </Center>
  );
};

export default NewsLetter;

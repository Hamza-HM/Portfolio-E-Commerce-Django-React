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

  const handleSubmit = (values, {setSubmitting, resetForm}) => {
    // Handle form submission logic here
    console.log(values); // For example, you can log the form values
    resetForm();
    setSubmitting(false);
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
        h="20vh"
        bg="url(https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
        backgroundSize="cover"
        backgroundPosition="bottom"
      >
        <Box textAlign="center" flexBasis={{ base: "100%", md: "50%" }}>
          <Heading backdropFilter="blur(5px)" color="white">
            Newsletter
          </Heading>
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
              <Form
                style={{
                  display: "flex",
                  gap: "5px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <Input
                        {...field}
                        type="email"
                        aria-label="Email"
                        placeholder="Email"
                        _placeholder={{ color: "white" }}
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

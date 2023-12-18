import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Flex,
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";
import * as Yup from "yup";

const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    // Implement your form submission logic here
    console.log(values); // Replace this with your form submission function

    // Reset the form after successful submission
    resetForm();
    setSubmitting(false);
  };

  return (
    <Flex justify="center" mt="4" w='full'>
      <Box w='full'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        w='full'
      >
        {({ isSubmitting }) => (
          <Form>
            <Heading fontSize='25px' mb='15px' textAlign='center'>Say Something!</Heading>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                    mb="3"
                  >
                    <Input
                      {...field}
                      type="text"
                      placeholder="Your Name"
                      aria-label="Your Name"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    mb="3"
                  >
                    <Input
                      {...field}
                      type="email"
                      placeholder="Your Email"
                      aria-label="Your Email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="message">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.message && form.touched.message}
                    mb="3"
                  >
                    <Input
                      {...field}
                      as="textarea"
                      placeholder="Your Message"
                      aria-label="Your Message"
                    />
                    <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                w="full"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Submit
              </Button>
          </Form>
        )}
      </Formik>
        </Box>
    </Flex>
  );
};

export default ContactForm;

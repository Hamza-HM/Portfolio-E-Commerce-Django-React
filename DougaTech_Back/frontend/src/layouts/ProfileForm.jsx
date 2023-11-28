import React from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { load_user, update_address } from "../actions/profile";

const AddressForm = ({profileInfo}) => {
  const dispatch = useDispatch();

  const initialValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    date_of_birth: "",
    profile_picture: "",
    loyalty_points: "",
    social_media_facebook: "",
    social_media_twitter: "",
    social_media_instagram: "",
    ...profileInfo,
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string(),
    last_name: Yup.string().notOneOf([Yup.ref('first_name')], 'First name and last name cannot be the same'),
    phone_number: Yup.string(),
    date_of_birth: Yup.string(),
    profile_picture: Yup.string(),
    loyalty_points: Yup.string(),
    social_media_facebook: Yup.string(),
    social_media_twitter: Yup.string(),
    social_media_instagram: Yup.string(),
    // Add more fields and their validations as needed
  });

  const handleCreateAddress = async (values, { setSubmitting }) => {
    if (values) {
      // Your dispatch action logic here for updating address
      setSubmitting(false);
    }
  };

  return (
    <Center>
      <Box maxW="500px" w="full" p={5}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateAddress}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Fields with Formik Field components */}
              <Field name="first_name">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.first_name && form.touched.first_name}>
                    <FormLabel>First Name</FormLabel>
                    <>
                      <Input {...field} aria-label="First Name" placeholder="Enter first name" />
                      <FormErrorMessage>
                        {form.errors.first_name}
                      </FormErrorMessage>
                    </>
                  </FormControl>
                )}
              </Field>

              <Field name="last_name">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.last_name && form.touched.last_name}>
                    <FormLabel>Last Name</FormLabel>
                    <>
                      <Input {...field} placeholder="Enter last name" />
                      <FormErrorMessage>
                        {form.errors.last_name}
                      </FormErrorMessage>
                    </>
                  </FormControl>
                )}
              </Field>

              <Field name="phone_number">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.phone_number && form.touched.phone_number}>
                    <FormLabel>Phone Number</FormLabel>
                    <>
                      <Input {...field} placeholder="Enter phone number" />
                      <FormErrorMessage>
                        {form.errors.phone_number}
                      </FormErrorMessage>
                    </>
                  </FormControl>
                )}
              </Field>

              <Field name="date_of_birth">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.date_of_birth && form.touched.date_of_birth}>
                    <FormLabel>Date of Birth</FormLabel>
                    <>
                      <Input {...field} placeholder="Enter date of birth" />
                      <FormErrorMessage>
                        {form.errors.date_of_birth}
                      </FormErrorMessage>
                    </>
                  </FormControl>
                )}
              </Field>

              <Field name="profile_picture">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.profile_picture && form.touched.profile_picture}>
                    <FormLabel>Profile Picture</FormLabel>
                    <>
                      <Input {...field} placeholder="Enter profile picture URL" />
                      <FormErrorMessage>
                        {form.errors.profile_picture}
                      </FormErrorMessage>
                    </>
                  </FormControl>
                )}
              </Field>

              <Field name="loyalty_points">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.loyalty_points && form.touched.loyalty_points}>
                    <FormLabel>Loyalty Points</FormLabel>
                    <>
                      <Input {...field} placeholder="Enter loyalty points" />
                      <FormErrorMessage>
                        {form.errors.loyalty_points}
                      </FormErrorMessage>
                    </>
                  </FormControl>
                )}
              </Field>

              <Field name="social_media_facebook">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.social_media_facebook && form.touched.social_media_facebook}>
                    <FormLabel>Facebook</FormLabel>
                    <>
                      <Input {...field} placeholder="Enter Facebook URL" />
                      <FormErrorMessage>
                        {form.errors.social_media_facebook}
                      </FormErrorMessage>
                    </>
                  </FormControl>
                )}
              </Field>

              <Field name="social_media_twitter">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.social_media_twitter && form.touched.social_media_twitter}>
                    <FormLabel>Twitter</FormLabel>
                    <>
                      <Input {...field} placeholder="Enter Twitter URL" />
                      <FormErrorMessage>
                        {form.errors.social_media_twitter}
                      </FormErrorMessage>
                    </>
                  </FormControl>
                )}
              </Field>

              <Field name="social_media_instagram">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.social_media_instagram && form.touched.social_media_instagram}>
                    <FormLabel>Instagram</FormLabel>
                    <>
                      <Input {...field} placeholder="Enter Instagram URL" />
                      <FormErrorMessage>
                        {form.errors.social_media_instagram}
                      </FormErrorMessage>
                    </>
                  </FormControl>
                )}
              </Field>
              <Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme="blue"
                w="full"
                mt={4}
                loadingText="Updating"
              >
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default AddressForm;

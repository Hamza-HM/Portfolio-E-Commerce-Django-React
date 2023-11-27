import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { create_address, update_address } from "../actions/profile";
// import { create_address, update_address } from '[your_action_path]'; // Update with your action path

const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM"; // Define your update form type if needed

const AddressForm = ({
  formType,
  activeItem,
  selectedAddress,
  success,
  loading,
}) => {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const countryList = useSelector((state) => state.profile?.countries) || [];

  const initialValues = {
    street_address: "",
    // apartment_address: "",
    country: "",
    zip: "",
    default_addr: false,
  };

  const validationSchema = Yup.object().shape({
    street_address: Yup.string().required("Street Address is required"),
    // apartment_address: Yup.string().required("Apartment Address is required"),
    country: Yup.string().required("Country is required"),
    zip: Yup.string().required("Zip Code is required"),
  });

  const handleCreateAddress = async (values, { setSubmitting }) => {
    if (values && activeItem) {
      const address_type = activeItem === "Billing Address" ? "B" : "S";
      if (formType === UPDATE_FORM) {
        await dispatch(
          update_address({
            ...values,
            address_type,
          })
        );
        setSubmitting(false);
      } else {
        await dispatch(
          create_address({
            ...values,
            address_type,
          })
        );
      }
      setSubmitting(false);
    }
  };

  //   const handleFormatCountries = (countries) => {
  //     const keys = Object.keys(countries);
  //     return keys.map((key) => {
  //       return {
  //         key: key,
  //         text: countries[key],
  //         value: key,
  //       };
  //     });
  //   };

  useEffect(() => {
    if (countryList.data) {
      setCountries(countryList.data);
    }
  }, [countryList.data]);

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
              <Field name="street_address">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.street_address && form.touched.street_address
                    }
                  >
                    <FormLabel>Street Address</FormLabel>
                    <Input {...field} placeholder="Enter street address" />
                    <FormErrorMessage>
                      {form.errors.street_address}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* 
              <Field name="apartment_address">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.apartment_address &&
                      form.touched.apartment_address
                    }
                  >
                    <FormLabel>Apartment Address</FormLabel>
                    <Input {...field} placeholder="Enter apartment address" />
                    <FormErrorMessage>
                      {form.errors.apartment_address}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field> */}

              <Field name="country">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.country && form.touched.country}
                  >
                    <FormLabel>Country</FormLabel>
                    <Select {...field} placeholder="Select country">
                      {Object.entries(countries).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{form.errors.country}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="zip">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.zip && form.touched.zip}
                  >
                    <FormLabel>Zip Code</FormLabel>
                    <Input {...field} placeholder="Enter zip code" />
                    <FormErrorMessage>{form.errors.zip}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="default_addr">
                {({ field }) => (
                  <Checkbox {...field} name="default_addr" mt="5">
                    Make this the default address
                  </Checkbox>
                )}
              </Field>

              <Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme="blue"
                w="full"
                mt={4}
              >
                {formType === UPDATE_FORM ? "Update" : "Create"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default AddressForm;

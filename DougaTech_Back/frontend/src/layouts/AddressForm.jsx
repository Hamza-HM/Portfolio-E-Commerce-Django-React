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
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { create_address, delete_address, load_addresses, update_address } from "../actions/profile";
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
  const [deleteLoading, setDeleteLoading] = useState(false);
      const [address_type, SetAddress_type] = useState(activeItem === "Billing Address" ? "B" : "S")
  const initialValues = {
    street_address: "",
    country: "",
    zip: "",
    default_addr: false,
    ...selectedAddress
  };

  const validationSchema = Yup.object().shape({
    street_address: Yup.string().required("Street Address is required"),
    // apartment_address: Yup.string().required("Apartment Address is required"),
    country: Yup.string().required("Country is required"),
    zip: Yup.string().required("Zip Code is required"),
  });

  const handleCreateAddress = async (values, { setSubmitting }) => {
    if (values && activeItem) {
      // console.log(address_type, values)
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

  const handleDeleteAddress = async () => {
    if (selectedAddress) {
      setDeleteLoading(true);
      await dispatch(delete_address(selectedAddress));
      setDeleteLoading(false);
    }
  }

  useEffect(() => {
    if (countryList.data) {
      setCountries(countryList.data);
    }
  }, [countryList.data]);
useEffect(() => {
console.log(selectedAddress, 'from form')
}, [selectedAddress])


  return (
    <Center>
      <Box maxW="500px" w="full" p={5}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateAddress}
          enableReinitialize
        >
          {({ isSubmitting, resetForm }) => (
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
                  <Checkbox {...field} name="default_addr" mt="5" isChecked={field.value}>
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
                loadingText={formType === UPDATE_FORM ? "Updating" : "Creating"}
              >
                {formType === UPDATE_FORM ? "Update" : "Create"}
              </Button>
              <Button
                onClick={handleDeleteAddress}
                colorScheme="blue"
                w="full"
                mt={4}
                isLoading={deleteLoading}
                loadingText='Deleting'
              >
                Delete
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default AddressForm;

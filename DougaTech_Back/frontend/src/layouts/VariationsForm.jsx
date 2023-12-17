import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Divider,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/products";

const VariationsForm = ({ variations, slug, handleAddToCart }) => {
  const dispatch = useDispatch();

  const initialValues = variations.reduce((acc, variation) => {
    return {
      ...acc,
      [variation.id]: "",
    };
  }, {});

  const validationSchema = Yup.object().shape(
    variations.reduce((acc, variation) => {
      return {
        ...acc,
        [variation.id]: Yup.string().required(
          `Please select ${variation.name}`
        ),
      };
    }, {})
  );

  const handleFormSubmit = (values, { resetForm }) => {
    const variations = Object.values(values);
    dispatch(addToCart({ slug, variations }));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ dirty, isValid }) => (
        <Form>
          {variations.map((variation) => (
            <Box key={variation.id}>
              <Divider my="4" />
              <Stack spacing="4">
                <Field name={variation.id}>
                  {({ field, form }) => (
                    <FormControl
                    isRequired
                      isInvalid={
                        form.errors[variation.id] && form.touched[variation.id]
                      }
                    >
                      <FormLabel>{variation.name}</FormLabel>
                      <Select
                        {...field}
                        placeholder={`Select ${variation.name}`}
                        onChange={(e) =>
                          form.setFieldValue(field.name, e.target.value)
                        }
                      >
                        {variation.item_variations.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.value}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>
              </Stack>
            </Box>
          ))}
          <Divider my="4" />

          <Stack direction="row" spacing={4} w=''>
            <Button type="submit" variant="solid" colorScheme="blue">
              Add to Cart
            </Button>
            <Button
              variant="solid"
              colorScheme="blue"
            >
              Buy Now
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default VariationsForm;

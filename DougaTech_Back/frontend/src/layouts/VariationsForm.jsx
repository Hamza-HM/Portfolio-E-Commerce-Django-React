import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Divider,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Button,
} from '@chakra-ui/react'; // Import Chakra UI components or your preferred UI library components
import { addToCart } from '../actions/products';
import {useDispatch} from 'react-redux'

const VariationsForm = ({ variations, slug }) => {
    const dispatch = useDispatch();

  const initialValues = variations.reduce((acc, variation) => {
    return {
      ...acc,
      [variation.id]: '',
    };
  }, {});

  const validationSchema = Yup.object().shape(
    variations.reduce((acc, variation) => {
      return {
        ...acc,
        [variation.id]: Yup.string().required(`Please select ${variation.name}`),
      };
    }, {})
  );

    const handleAddToCart = (values, { resetForm }) => {
        const submittedVariations = Object.values(values); // Pass the form values to the parent component
        dispatch(addToCart({ slug, variations: submittedVariations  }));
        resetForm();
      };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleAddToCart}
    >
      {({ dirty, isValid }) => (
        <Form>
          {variations.map((variation) => (
            <Box key={variation.id}>
              <Divider my="4" />
              <Heading size="md">{variation.name}:</Heading>
              <Stack spacing="4">
                <Field name={variation.id}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors[variation.id] && form.touched[variation.id]}>
                      <FormLabel>{variation.name}</FormLabel>
                      <Select
                        {...field}
                        placeholder={`Select ${variation.name}`}
                        onChange={(e) => form.setFieldValue(field.name, e.target.value)}
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
          <Button
            mt="4"
            colorScheme="teal"
            type="submit"
            disabled={!dirty || !isValid}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default VariationsForm;

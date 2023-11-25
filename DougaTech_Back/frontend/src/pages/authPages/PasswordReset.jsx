import * as Yup from "yup";
import {
  Center,
  Box,
  Input,
  Button,
  useColorMode,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { passwordReset } from "../../actions/auth";
import { useDispatch } from "react-redux";
const PasswordReset = () => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
  };

  const validationSchemas = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email field is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values) {
      console.log(values);
      await dispatch(passwordReset(values));
      setSubmitting(false);
    }
  };
  return (
    <Center h="70vh">
      <Box
        maxW="500px"
        w="full"
        py="5"
        className={colorMode === "light" ? "mdx-prose" : ""}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas}
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
                      area-aria-label="Email"
                      placeholder="Email"
                    />
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

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getCoupon } from "../actions/cart";

const CouponForm = () => {
  const dispatch = useDispatch();
  const { coupon } = useSelector((state) => state?.payment);
  const initialValues = {
    code: "",
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Coupon code is required"),
  });

  const handleCouponSubmit = async (values, { setSubmitting, resetForm }) => {
    await dispatch(getCoupon({ code: values.code }));
    setSubmitting(false);
    resetForm();
  };

  return (
    <Box mt="5">
      {coupon?.error && <Text color="red">Invalid Coupon</Text>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCouponSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="code">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.code && form.touched.code}
                  mb={4}
                >
                  {/* <FormLabel htmlFor="code">Coupon Code</FormLabel> */}
                  <Input
                    {...field}
                    id="code"
                    placeholder="Enter coupon"
                    variant="flushed"
                  />
                  <FormErrorMessage>{form.errors.code}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting..."
              colorScheme="blue"
            >
              Apply
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CouponForm;

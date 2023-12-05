import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getCoupon } from "../actions/cart";

const CouponForm = () => {
  const couponStateFromRedux = useSelector((state) => state?.payment.coupon);
  const dispatch = useDispatch();
  const toast = useToast();

  const initialValues = {
    code: "",
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Coupon code is required"),
  });

  const handleCouponSubmit = (values, actions) => {
    dispatch(getCoupon({ code: values.code }))
      .then(() => {
        actions.setSubmitting(false);
        actions.resetForm();
      })
      .catch((error) => {
        console.log(error)
        actions.setSubmitting(false);
        toast({
          title: "Error",
          description: "Invalid coupon!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      {couponStateFromRedux.error && (
        <p>There was an error: {couponStateFromRedux.error}</p>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleCouponSubmit(values, actions)}
      >
        {( isSubmitting ) => (
          <Form>
            <Field name="code">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.code && form.touched.code}
                  mb={4}
                >
                  <FormLabel htmlFor="code">Coupon Code</FormLabel>
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
              isLoading={formikProps.isSubmitting}
              loadingText="Submitting"
              colorScheme="blue"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CouponForm;

import React from "react";
import { Divider, Button } from "semantic-ui-react";
import { CardElement } from "@stripe/react-stripe-js";

const PaymentForm = ({ handleSubmit, loading }) => {
  return (
    <>
      <Divider />
      <React.Fragment>
        <h1>Complete your order</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <CardElement />
          <Button
            loading={loading}
            disabled={loading}
            onClick={(e) => handleSubmit(e)}
            primary
            type="submit"
            className="mt-3"
          >
            Pay
          </Button>
        </form>
      </React.Fragment>
    </>
  );
};

export default PaymentForm;

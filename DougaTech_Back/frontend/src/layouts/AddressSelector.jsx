import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load_addresses, load_countries } from "../actions/profile";
import AddressCard from "./AddressCard";

const AddressSelector = () => {
  const address = useSelector(
    (state) => state?.profile.addresses.data?.results
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_countries());
    dispatch(load_addresses({ addrType: "S" }));
  }, []);

  return <>{address && <AddressCard addrData={address[0]} />}</>;
};

export default AddressSelector;

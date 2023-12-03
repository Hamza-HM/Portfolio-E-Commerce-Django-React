import { useDispatch } from "react-redux";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useEffect } from "react";
import { checkAuthenticated } from "../actions/auth";
import { load_user } from "../actions/profile";
import { fetchCart } from "../actions/cart";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const cart = {
    first: "first",
    second: "second",
  };
  useEffect(() => {
    dispatch(checkAuthenticated());
    dispatch(load_user());
    dispatch(fetchCart());
  }, []);

  return (
    <div>
      <Navbar cart={cart} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

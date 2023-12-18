import { useDispatch } from "react-redux";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useEffect } from "react";
import { checkAuthenticated } from "../actions/auth";
import { fetchCart } from "../actions/cart";
import { useSelector } from "react-redux";
import { load_user } from "../actions/profile";
import { Spinner, Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart);
  const { isAuthenticated, loading } = useSelector((state) => state?.auth);

  useEffect(() => {
    dispatch(checkAuthenticated());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(load_user());
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) {
    return (
      <Box textAlign="center" w="100%" mt="10">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  return (
    <>
      {/* Render content only when not loading */}
      {children && !loading && <Navbar cart={cart} />}
      {children && !loading && <Box as="main">{children}</Box>}
      {children && !loading && <Footer />}
    </>
  );
};

export default Layout;

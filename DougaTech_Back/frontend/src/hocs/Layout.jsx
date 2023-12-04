import { useDispatch } from "react-redux";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useEffect } from "react";
import { checkAuthenticated } from "../actions/auth";
import { fetchCart } from "../actions/cart";
import { useSelector } from "react-redux";
import { load_user } from "../actions/profile";
import { useNavigate } from "react-router-dom";

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


  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      {/* Render content only when not loading */}
      {children && !loading && <Navbar cart={cart} />}
      {children && !loading && children}
      {children && !loading && <Footer />}
    </div>
  );
};

export default Layout;
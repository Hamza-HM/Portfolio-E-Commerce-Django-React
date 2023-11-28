import { useEffect } from "react";
import { facebookAuth } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import queryString from "query-string";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const Facebook = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const params = queryString.parse(location.search);
      const state = params.state ? params.state : null;
      const code = params.code ? params.code : null;

      if (state && code) {
        dispatch(facebookAuth({ state, code }));
        navigate("/");
      }
    };
    fetchData();
  }, [location]);

  return (
    <Box className="container mt-5 pt-5">
      <Box className="jumbotron mt-5">
        <Heading as="h1">Facebook</Heading>
        <Heading as="h1" size="2xl">
          Welcome to Ibrahim Engineering Website
        </Heading>
        <Text fontSize="xl" mt="4">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </Text>
        <hr className="my-4" />
        <Text>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </Text>
        <Text fontSize="xl" mt="4">
          Click the log in button to log in
        </Text>
        <Link to="/login">
          <Button colorScheme="blue" size="lg" mt="4">
            Log In
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Facebook;

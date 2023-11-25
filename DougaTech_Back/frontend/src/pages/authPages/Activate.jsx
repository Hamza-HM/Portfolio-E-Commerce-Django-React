import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activate } from "../../actions/auth";
import { Box, Button, Center, Text } from "@chakra-ui/react";

const Activate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, success, error } = useSelector(
    (state) => state?.auth
  );

  const handleSubmit = async () => {
    setLoading(true);
    if (uid && token) {
      const values = {
        uid,
        token,
      };
      await dispatch(activate(values));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <Center h="50vh">
      <Box maxW="500px" w="full">
        {error && typeof error === "object" ? (
          Object.values(error).map((errorItem, index) => (
            <Text key={index} textAlign="center" color="red" my="5">
              {errorItem}
            </Text>
          ))
        ) : (
          <Text textAlign="center" color="red" my="5">
            {error}
          </Text>
        )}
        {success && (
          <Text textAlign="center" color="green" my="5">
            {success}
          </Text>
        )}
        <Button
          w="full"
          variant="outline"
          onClick={handleSubmit}
          isLoading={loading}
        >
          Activate
        </Button>
      </Box>
    </Center>
  );
};

export default Activate;

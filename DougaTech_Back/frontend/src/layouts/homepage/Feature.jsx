import { Box, Flex, Center } from "@chakra-ui/react";
import React from "react";

const Feature = () => {
  return (
    <Center>
      <Box
        h="80vh"
        boxShadow="lg"
        w="full"
        backgroundImage={
          "https://images.pexels.com/photos/894359/pexels-photo-894359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        backgroundSize="cover"
        backgroundPosition="center"
      ></Box>
    </Center>
  );
};

export default Feature;

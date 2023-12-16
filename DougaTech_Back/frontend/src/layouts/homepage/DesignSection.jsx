import React from "react";
import { HStack, Box } from "@chakra-ui/react";

const DesignSection = () => {
  return (
    <HStack justifyContent="space-evenly" flexWrap="wrap" py="10px">
      <Box
        bgImage="url('https://images.pexels.com/photos/401107/pexels-photo-401107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
        backgroundSize="cover"
        backgroundPosition="center"
        width={{ base: "95%", md: "49%", lg: "49%" }} // Responsive width for different screen sizes
        height={{ base: "250px", md: "300px", lg: "400px" }} // Responsive height for different screen sizes
        borderRadius="10px"
        mb="20px" // Add margin bottom for spacing between images
      ></Box>
      <Box
        bgImage="url('https://images.pexels.com/photos/1037993/pexels-photo-1037993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
        backgroundSize="cover"
        backgroundPosition="center"
        width={{ base: "95%", md: "49%", lg: "49%" }} // Responsive width for different screen sizes
        height={{ base: "250px", md: "300px", lg: "400px" }} // Responsive height for different screen sizes
        borderRadius="10px"
        mb="20px" // Add margin bottom for "spacing between images
      ></Box>
    </HStack>
  );
};

export default DesignSection;

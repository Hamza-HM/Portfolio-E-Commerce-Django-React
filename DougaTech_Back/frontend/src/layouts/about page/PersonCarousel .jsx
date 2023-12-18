import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const PersonCarousel = ({ teamMembers }) => {
    console.log(typeof(teamMembers))
  return (
    <Carousel
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
      stopOnHover={true}
      showArrows={true}
    >
      {teamMembers.map((member, i) => (
        <Box key={i} display='flex' justifyContent='center'>
          <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="4"
            m="2"
          >
            <Box
              as="img"
              src={member.image} // Assuming your images are named person1.jpg, person2.jpg, etc.
              alt={`Person ${i + 1}`}
              w="100%"
              h="200px"
              objectFit="cover"
            />
            <Heading as="h3" fontSize="xl" mt="2" mb="1">
              {member.name}
            </Heading>
            <Text>{member.position}</Text>
            <Text mt="2" fontSize="sm">{member.description}</Text> {/* Display the description */}
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default PersonCarousel;

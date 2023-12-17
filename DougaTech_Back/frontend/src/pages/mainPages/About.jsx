import React from "react";
import { Box, Flex, Heading, Text, SimpleGrid, Button } from "@chakra-ui/react";

const About = () => {
  return (
    <>
      {/* Hero Banner */}
      <Box
        bgImage="url('https://img.freepik.com/photos-gratuite/abstrait-bleu-degrade-bleu-fonce-lisse-studio-vignette-noir_1258-108879.jpg?w=1380&t=st=1702829545~exp=1702830145~hmac=cc3013e908e43201268a777f1a72106b839a82c0381de0017397f8557a1751fc')" // Replace 'hero-image.jpg' with your image path
        bgSize="cover"
        bgPosition="center"
        height="50vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        textAlign="center"
        pt="55px"
      >
        <Box>
          <Heading as="h1" fontSize="4xl" mb="4">
            About Us
          </Heading>
          <Text fontSize="xl">Your slogan goes here</Text>
        </Box>
      </Box>

      {/* Information Columns */}
      <Flex justifyContent="center" p="40px">
        <SimpleGrid columns={2} spacing={10} width="80%">
          {/* First Column */}
          <Box>
            <Heading as="h2" fontSize="2xl" mb="3">
              Column 1 Title
            </Heading>
            <Text>
              Information about your company, services, or mission can go here.
            </Text>
          </Box>

          {/* Second Column */}
          <Box>
            <Heading as="h2" fontSize="2xl" mb="3">
              Column 2 Title
            </Heading>
            <Text>
              More details or other relevant information can be placed here.
            </Text>
          </Box>
        </SimpleGrid>
      </Flex>

      {/* People Section */}
      <Box bg="#f4f4f4" py="40px" textAlign="center">
        <Heading as="h2" fontSize="3xl" mb="4">
          Meet Our Team
        </Heading>
        {/* Add your team members' information or photos here */}
        <Flex justifyContent="center">
          {/* Example of a person's card */}
          <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" m="2">
            <Box as="img" src="person1.jpg" alt="Person 1" w="100%" h="200px" objectFit="cover" />
            <Heading as="h3" fontSize="xl" mt="2" mb="1">
              John Doe
            </Heading>
            <Text>Position</Text>
            {/* Additional information about the person */}
          </Box>

          {/* Add more team members' cards as needed */}
        </Flex>
        <Flex justify='center'>
          <Button>Contact Us</Button>
        </Flex>
      </Box>
    </>
  );
};

export default About;

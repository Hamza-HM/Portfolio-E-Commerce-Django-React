import React from 'react';
import { Box, Flex, Heading, Text, SimpleGrid, Button } from '@chakra-ui/react';
import GoogleMap from '../../layouts/contactUs page/GoogleMap';
import ContactForm from '../../layouts/contactUs page/ContactForm';

const ContactUs = () => {
  const teamMembers = [
    // Your team members data here...
  ];

  return (
    <>
      {/* Hero Section with Address, Phone, and Email */}
      <SimpleGrid
        h='40vh'
        alignItems='center'
        columns={{ base: 1, md: 3 }}
        bg="blue.500"
        color="white"
        textAlign="center"
        pt="55px"
        px="20px"
      >
        {/* Address */}
        <Box>
          <Heading as="h1" fontSize="4xl" mb="4">
            Address
          </Heading>
          <Text fontSize="lg">
            1234 Main Street, City, Country
          </Text>
        </Box>

        {/* Phone */}
        <Box>
          <Heading as="h1" fontSize="4xl" mb="4">
            Phone
          </Heading>
          <Text fontSize="lg">
            +123 456 7890
          </Text>
        </Box>

        {/* Email */}
        <Box>
          <Heading as="h1" fontSize="4xl" mb="4">
            Email
          </Heading>
          <Text fontSize="lg">
            example@example.com
          </Text>
        </Box>
      </SimpleGrid>

      {/* Information Columns */}
      <Flex justifyContent="center" p="40px">
        <SimpleGrid
          gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          spacing={10}
          width="80%"
          alignItems="center"
        >
          <Box>
            <ContactForm />
          </Box>
          <Box>
            <GoogleMap />
          </Box>
        </SimpleGrid>
      </Flex>

      {/* People Section */}
      <Box py="40px" textAlign="center">
        {/* Your People Section Content Goes Here */}
      </Box>
    </>
  );
};

export default ContactUs;

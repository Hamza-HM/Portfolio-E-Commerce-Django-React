import React from "react";
import { Box, Heading, Text, Container, Flex } from "@chakra-ui/react";
import PersonCard from "../../layouts/about page/PersonCard";
import Feature from "../../layouts/home page/Feature";
import PersonCarousel from "../../layouts/contactUs page/PersonCarousel ";

const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      position: "CEO",
      description:
        "Responsible for strategic planning and overall company direction.",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Jane Smith",
      position: "Lead Developer",
      description:
        "Leads the development team and ensures timely project deliveries.",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "John Doe",
      position: "CEO",
      description:
        "Responsible for strategic planning and overall company direction.",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Jane Smith",
      position: "Lead Developer",
      description:
        "Leads the development team and ensures timely project deliveries.",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    // Add more team member descriptions as needed
  ];

  return (
    <>
      {/* Hero Banner */}
      <Box
        bgImage="url('https://img.freepik.com/photos-gratuite/concept-entreprise-innovation-poignee-main-partenariat_53876-104048.jpg?w=1380&t=st=1702907238~exp=1702907838~hmac=84fb83ef035a8ce706fd28fb9969d89aa0d778ccdae73b9963170bcdc3d456bf')"
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
          <Text fontSize="xl">Your company's story and mission statement.</Text>
        </Box>
      </Box>
      {/* Our Story Section */}
      <Container py="40px"  textAlign='center'>
        <Heading as="h2" fontSize="3xl" mb="4">
          Our Story
        </Heading>
        <Text fontSize="lg"  textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos
          laudantium hic debitis? Quibusdam voluptate exercitationem consectetur
          corporis illo pariatur, qui harum, totam delectus nesciunt odit
          voluptatem amet, sint officia temporibus.
        </Text>
      </Container>
      {/* Team Members Section */}
      <Box py="40px" textAlign="center">
        <Heading as="h2" fontSize="3xl" mb="4">
          Meet Our Team
        </Heading>
        <Flex justifyContent="center" overflow='hidden' mx='5px'>
          <PersonCarousel teamMembers={teamMembers} />
        </Flex>
      </Box>
    </>
  );
};

export default About;

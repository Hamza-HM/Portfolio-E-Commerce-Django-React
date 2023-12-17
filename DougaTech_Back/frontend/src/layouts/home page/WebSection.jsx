import { Box, Center, Heading, Text } from "@chakra-ui/react";

const WebsiteSection = () => {
  return (
    <Center display="block" textAlign="center">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection='column'
        as="h1"
        h="50vh"
        w="100vwX"
        fontSize="50px"
        backgroundImage="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        backgroundPosition="center"
        backgroundSize="cover"
        overflow='hidden'
      >
        <Heading>
          Web Development
        </Heading>
        <Text fontSize='20px'>Your best solution for creating stunning websites</Text>
      </Box>
    </Center>
  );
};

export default WebsiteSection;

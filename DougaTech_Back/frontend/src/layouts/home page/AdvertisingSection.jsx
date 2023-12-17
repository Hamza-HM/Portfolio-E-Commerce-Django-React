import { Box, Center, Heading, Text } from "@chakra-ui/react";

const AdvertisingSection = () => {
  return (
    <Center display="block" textAlign="center">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        as="h1"
        h="50vh"
        w="100vwX"
        fontSize="50px"
        backgroundImage="https://img.freepik.com/photos-gratuite/jeune-femme-designer-travaillant-son-ordinateur-portable_23-2149142107.jpg?w=1060&t=st=1702768847~exp=1702769447~hmac=3fbffcb1f23a1e7090e7f7b48c193d4336fe6a6ca15c7e4e055ac4f8d7045c31"
        backgroundPosition="center"
        backgroundSize="cover"
        overflow="hidden"
        color="blue"
      >
        <Heading fontSize="50px">Design</Heading>
        <Text fontSize="20px">Your ideas our Touch!</Text>
      </Box>
    </Center>
  );
};

export default AdvertisingSection;

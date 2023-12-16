import { Box, Center, Grid, Image } from "@chakra-ui/react";

const Feature = () => {
  console.log("douga");
  return (
    <>
      <Center
        py="10"
        display="grid"
        textAlign="center"
        backgroundColor="#092635"
      >
        <Box as="h1" w="full" fontSize="50px" mb="10" >
          Feature
        </Box>
        <Grid
          w="100%"
          gap="10"
          gridTemplateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          alignItems='center'
          justifyContent='center'
        >
          <Box maxW={{ base: "250px", lg: "300px" }} >
            <Box borderRadius="md" display='flex'>
              <Image
                src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Feature Image"
                objectFit='cover'
                borderRadius={30}
              />
            </Box>
            Sketch it up!
          </Box>
          <Box maxW={{ base: "250px", lg: "300px" }} >
            <Box borderRadius="md" display='flex'>
              <Image
                src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Feature Image"
                objectFit='cover'
                borderRadius={30}
              />
            </Box>
            Design your ideas
          </Box>
          <Box maxW={{ base: "250px", lg: "300px" }} >
            <Box borderRadius="md" display='flex'>
              <Image
                src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Feature Image"
                objectFit='cover'
                borderRadius={30}
              />
            </Box>
            Web Development
          </Box>
          <Box maxW={{ base: "250px", lg: "300px" }} >
            <Box borderRadius="md" display='flex'>
              <Image
                src="https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Feature Image"
                objectFit='cover'
                borderRadius={30}
              />
            </Box>
           Sponsoring
          </Box>

        </Grid>
      </Center>
    </>
  );
};

export default Feature;

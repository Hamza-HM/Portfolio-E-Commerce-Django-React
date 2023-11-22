import { Box, Center, Divider, Flex, Image, Text, useColorMode } from "@chakra-ui/react";

const List = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };

  return (
    <Center h="100%" my="5">
      <Flex
        maxW="1000px"
        w={["90vw", "90vw", "90vw", "70vw"]}
        direction={["column", "column", "row", "row"]}
        justify="center"
        bg={bgColor[colorMode]}
        rounded="lg"
        p="4"
      >
        <Box as="section" flex="1" display="flex" mx="2" alignItems="center">
          <Image src="" alt="some image" />
          <Box ml="4">
            <Text as="h2" fontSize="xl" fontWeight="bold" mb="2">
              Usability
            </Text>
            <Text as="h3" fontSize="lg" fontWeight="light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
              doloribus incidunt
            </Text>
          </Box>
        </Box>
        <Center display={{base: 'none', md: 'flex'}}>
        <Divider orientation='vertical' bg={bgColor[colorMode]} w='1px' h='120px'/>
        </Center >
        <Box as="section" flex="1" display="flex" mx="2" alignItems="center">
          <Image src="" alt="some image" />
          <Box ml="4">
            <Text as="h2" fontSize="xl" fontWeight="bold" mb="2">
              Usability
            </Text>
            <Text as="h3" fontSize="lg" fontWeight="light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
              doloribus incidunt
            </Text>
          </Box>
        </Box>
        <Center display={{base: 'none', md: 'flex'}}>
        <Divider orientation='vertical' bg={bgColor[colorMode]} w='1px' h='120px'/>
        </Center >
        <Box as="section" flex="1" display="flex" mx="2" alignItems="center">
          <Image src="" alt="some image" />
          <Box ml="4">
            <Text as="h2" fontSize="xl" fontWeight="bold" mb="2">
              Usability
            </Text>
            <Text as="h3" fontSize="lg" fontWeight="light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
              doloribus incidunt
            </Text>
          </Box>
        </Box>
      </Flex>
    </Center>
  );
};

export default List;

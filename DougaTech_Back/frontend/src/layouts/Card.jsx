import { StarIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const Card = () => {
    const {colorMode} = useColorMode();
    const bgColor = {light: 'gray.200', dark: 'gray.700'}
    const textColor = {light: 'gray.500', dark: 'gray.100'}
  return (
    <Center>
      <Box
        bg="gray.200"
        w="400px"
        rounded="20px"
        overflow="hidden"
        boxShadow="sm"
        my={5}
        bg={bgColor[colorMode]}
      >
        <Box
          w="100%" /* Set width to 100% */
          h="200px"
          bg="green"
          display="flex"
          alignItems="center" /* Center content vertically */
          justifyContent="center" /* Center content horizontally */
        >
          <Heading>Image stuff</Heading>
        </Box>
        {/* <Image alt='Course Cover'/> */}
        <Box p={5}>
          <Stack direction="row" spacing={2} align="baseline">
            <Badge variant="solid" colorScheme="teal" rounded="full" px={2}>
              New!
            </Badge>
            <Badge variant="solid" colorScheme="teal" rounded="full" px={2}>
              React
            </Badge>
            <Text
              textTransform="uppercase"
              fontSize="sm"
              color="gray.500"
              letterSpacing="wide"
            >
              2 Hours &bull; 12 lectures
            </Text>
          </Stack>
          <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
            Introduction to chakra-ui
          </Text>
          <Text isTruncated>
            Lorem ipsum dolor sit amet consectetur
            <br />
            adipisicing elit. Maiores distinctio
            <br />
            ex consequuntur, nulla laborum velit!
            <br />
            Voluptatem qui iure, hic ea recusandae omnis saepe aliquam vitae
            debitis veritatis, neque, odio quae.
          </Text>
          <Flex justify="space-between" align="center" my={4} textColor={textColor[colorMode]}>
            <Text fontWeight="semibold" fontSize="lg">
              2000 DA
            </Text>
            <Flex align="center">
              {Array(4)
                .fill("")
                .map((_, i) => {
                  return <StarIcon key={i} color="teal.500" />;
                })}
              <StarIcon mr={2} />
              <Text as="h3" fontSize="lg" fontWeight="semibold" ml={1}>
                34 Reviews
              </Text>
            </Flex>
          </Flex>
          <Box textAlign="center">
            <Button
              colorScheme="teal"
              size="lg"
              mt={3}
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              _active={{ boxShadow: "lg" }}
            >
              Sign Up Now!
            </Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
};

export default Card;

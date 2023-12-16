import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Flex
      w={"full"}
      h={"80vh"}
      backgroundImage={
        "url(https://img.freepik.com/photos-gratuite/armoire-numerique-ecran-transparent_53876-105380.jpg?w=1060&t=st=1702504418~exp=1702505018~hmac=7ae39ce4fb4877537838564f2e00e4d39dbdf14a51cb152343fbc91c037d2d35)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center 20%"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack
          maxW={"2xl"}
          align="center"
          color="white"
          spacing={6}
          backdropFilter="blur(3px)"
          border="rounded"
          textAlign="center"
        >
          <Text
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            Empowering Success, <br />
            One Hero at a Time.
          </Text>
          <Text>Make sure to visite our amazing Collection</Text>
          <Stack direction={"row"}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="blue.400"
              h="2rem"
              w="5rem"
              rounded="10"
              color={"white"}
              _hover={{ bg: "blue.600" }}
              transition=".2s ease-in-out"
            >
              <Link>Shop ></Link>
            </Box>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
};

export default Hero;

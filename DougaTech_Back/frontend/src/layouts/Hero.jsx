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
        "url(https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align="center" spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
            textAlign="center"
          >
            Empowering Success, <br />
            One Hero at a Time.
          </Text>
          <Text color={"white"}>Make sure to visite our amazing Collection</Text>
          <Stack direction={"row"}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              bg="blue.400"
              h='2rem'
              w='5rem'
              rounded="10"
              color={"white"}
              _hover={{ bg: "blue.600" }}
              transition='.2s ease-in-out'
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

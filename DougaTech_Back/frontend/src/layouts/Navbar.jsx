import { Box, Button, Flex, Heading, useColorMode } from "@chakra-ui/react";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg={colorMode === "light" ? "gray.800" : "gray.900"}
        color={colorMode === "light" ? "white" : "gray.200"}
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            Logo
          </Heading>
        </Flex>

        <Box display={{ base: "none", md: "block" }}>
          <Button
            onClick={toggleColorMode}
            variant="outline"
            colorScheme={colorMode === "light" ? "dark" : "light"}
          >
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </Box>
      </Flex>
    );
   };

   export default Navbar;

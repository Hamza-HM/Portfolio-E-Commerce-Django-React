import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { Box, Center, Heading, Image, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode } from "@chakra-ui/react";

function AuthForm() {
    const {colorMode } = useColorMode();
  return (
    <Center mt={20}>
    <Box bg={colorMode === 'light'? 'gray.200' : 'gray.600'} w='350px' p={3} boxShadow='sm' rounded>
        <Image src='../../assets/react.svg' w='80px' mx='auto' my={10}/>
        <Tabs variant='enclosed-colored' isFitted mg={4}>
            <TabList>
            <Tab>Sign Up</Tab>
            <Tab>Login</Tab>
            </TabList>
            <TabPanels my={4}>
                <TabPanel>
                    <SignUp />
                </TabPanel>
                <TabPanel>
                    <Login />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Box>
    </Center>
  );
}

export default AuthForm;

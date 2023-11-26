import { Box, Center, Divider, Grid, HStack, Link, Text, VStack, useColorMode } from "@chakra-ui/react";
import Address from "../../layouts/AddressForm";
import { load_addresses, load_countries } from "../../actions/profile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";

const Profile = () => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };

  useEffect(() => {
    dispatch(load_countries())
    dispatch(load_addresses())
  }, [])

  return (
    <HStack spacing={0} justify="center">
      <VStack flex="1" align="stretch" p={4}>
        {/* Left column with links */}
        <Text fontSize="lg" fontWeight="bold">Links</Text>
        {/* Links in the left column */}
        <Grid align="stretch" gap={5}>
          <Link href="#">Profile</Link>
          <Link href="#">Addresses</Link>
          <Link href="#">Orders</Link>
          <Link href="#">Payments</Link>
          {/* Add more links as needed */}
        </Grid>
      </VStack>
      <Center display={{base: 'none', md: 'flex'}}>
        <Divider orientation='vertical' bg={bgColor[colorMode]} w='1px' h='90vh'/>
        </Center>
      <VStack flex="2" align="stretch" p={4} textAlign='center'>
        <Address />

      </VStack>
    </HStack>
  );
};

export default Profile;

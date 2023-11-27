import {
  Box,
  Center,
  Divider,
  Grid,
  HStack,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import Address from "../../layouts/AddressForm";
import { load_addresses, load_countries } from "../../actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";

const Profile = () => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const [ addresses, setAddresses ] = useState({
    billing: null,
    shipping: null,
  });
  const bgColor = { light: "gray.100", dark: "gray.700" };
  const { results } = useSelector((state) => state.profile?.addresses?.data);
  useEffect(() => {
    dispatch(load_countries());
    dispatch(load_addresses({ addrType: "" }));
  }, []);

  useEffect(() => {
    if (results) {
      const updatedAddresses = { ...addresses }; // Copy the current state
      for (const result of results) {
        if (result.address_type === 'B') {
          updatedAddresses.billing = result;
        } else {
          updatedAddresses.shipping = result;
        }
      }
      setAddresses(updatedAddresses); // Update the state after the loop
    }
  }, [results]);

  return (
    <HStack spacing={0} justify="center">
      <VStack flex="1" align="stretch" p={4}>
        {/* Left column with links */}
        <Text fontSize="lg" fontWeight="bold">
          Links
        </Text>
        {/* Links in the left column */}
        <Grid align="stretch" gap={5}>
          <Link href="#">Profile</Link>
          <Link href="#">Addresses</Link>
          <Link href="#">Orders</Link>
          <Link href="#">Payments</Link>
          {/* Add more links as needed */}
        </Grid>
      </VStack>
      <Center display={{ base: "none", md: "flex" }}>
        <Divider
          orientation="vertical"
          bg={bgColor[colorMode]}
          w="1px"
          h="90vh"
        />
      </Center>
      <VStack flex="2" align="stretch" p={4} textAlign="center">
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Addresses
        </Text>
        <Tabs variant="enclosed-colored" isFitted my="4">
          <TabList>
            <Tab>Billind Address</Tab>
            <Tab>Shipping Address</Tab>
          </TabList>
          <TabPanels my="4">
            <TabPanel>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Billind Address</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Address
                        selectedAddress={addresses && addresses.billing}
                        formType={addresses.billing ? UPDATE_FORM: CREATE_FORM}
                        activeItem="Billing Address"
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Shipping Address</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Address
                        selectedAddress={addresses && addresses.shipping}
                        formType={addresses.shipping ? UPDATE_FORM: CREATE_FORM}
                        activeItem="Shipping Address"
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </HStack>
  );
};

export default Profile;

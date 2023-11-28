import {
  Box,
  Button,
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
  transition,
  useColorMode,
} from "@chakra-ui/react";
import Address from "../../layouts/AddressForm";
import { load_addresses, load_countries } from "../../actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";

import React from "react";

const AddressCard = ({ addressData }) => {
  console.log(addressData);
  const CountryList = useSelector((state) => state.profile?.countries);
  return (
    <Box
      border="1px"
      p={4}
      mb={4}
      borderRadius="md"
      boxShadow="md"
      transition="transform 0.5s, box-shadow 0.5s"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "lg",
        cursor: "pointer",
      }}
    >
      <Text fontWeight="bold" mb={2} fontSize="lg">
        Address Details
      </Text>
      {addressData && (
        <VStack align="flex-start" spacing={2} pt={2}>
          <Text fontSize="md">{`Street: ${addressData.street_address}`}</Text>
          <Text fontSize="md">{`Country: ${
            CountryList && CountryList.data[addressData.country]
          }`}</Text>
          <Text fontSize="md">{`Zip: ${addressData.zip}`}</Text>
          <Text fontSize="md">{`Default: ${addressData.default_addr}`}</Text>
          {/* Add more address fields as needed */}
          <Button size="sm" colorScheme="blue" mt={2}>
            Update Address
          </Button>
        </VStack>
      )}
    </Box>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };
  const { results } = useSelector((state) => state.profile?.addresses?.data);

  console.log(results);
  const billingAddress = results?.find((addr) => addr.address_type === "B");
  const shippingAddress = results?.find((addr) => addr.address_type === "S");
  console.log(billingAddress, shippingAddress, "found");
  useEffect(() => {
    dispatch(load_countries());
    dispatch(load_addresses({ addrType: "" }));
  }, []);

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
              <AddressCard
                addressData={results?.find((addr) => addr.address_type === "B")}
              />
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
                        selectedAddress={results?.find(
                          (addr) => addr.address_type === "B"
                        )}
                        formType={
                          results?.find((addr) => addr.address_type === "B")
                            ? UPDATE_FORM
                            : CREATE_FORM
                        }
                        activeItem="Billing Address"
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <AddressCard
                addressData={
                  results && results?.find((addr) => addr.address_type === "S")
                }
              />
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
                        selectedAddress={
                          results &&
                          results?.find((addr) => addr.address_type === "S")
                        }
                        formType={
                          results?.find((addr) => addr.address_type === "S")
                            ? UPDATE_FORM
                            : CREATE_FORM
                        }
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

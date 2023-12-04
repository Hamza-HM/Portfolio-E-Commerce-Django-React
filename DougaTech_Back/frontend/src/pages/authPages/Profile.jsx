import {
  Button,
  Center,
  Divider,
  Grid,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { load_addresses, load_countries } from "../../actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddrTabPanel from "../../layouts/AddrTabPanel";
import ProfileForm from "../../layouts/ProfileForm";
import ProfileCard from "../../layouts/ProfileCard";

const profileLinks = [
  { name: "Profile", item: "profileInfo" },
  { name: "Addresses", item: "addresses" },
  { name: "Payment History", item: "payments" },
];
const Profile = () => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };
  const { addresses, user } = useSelector((state) => state?.profile);
  const {isAuthenticated} = useSelector(state => state?.auth)
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("profileInfo");

  useEffect(() => {
    dispatch(load_countries());
    dispatch(load_addresses({ addrType: "" }));
  }, []);

  useEffect(() => {
    if (!isAuthenticated){
      navigate('/')
    }
  }, [isAuthenticated]);


  return (
    <HStack spacing={0} justify="center">
      <VStack flex="1" align="stretch" p={4}>
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          Links
        </Text>
        <Grid align="stretch" gap={5}>
          {profileLinks.map((link) => {
            return (
              <Button key={link.name} onClick={() => setActiveItem(link.item)}>
                {link.name}
              </Button>
            );
          })}
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
      {activeItem === "addresses" && (
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
                <AddrTabPanel
                  addressData={addresses?.data.results.find(
                    (addr) => addr.address_type === "B"
                  )}
                  addrType='B'
                  />
              </TabPanel>
              <TabPanel>
                <AddrTabPanel
                  addressData={addresses?.data.results.find(
                    (addr) => addr.address_type === "S"
                    )}
                    addrType='S'
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      )}
      {activeItem === "profileInfo" && (
        <VStack flex="2" align="stretch" p={4} textAlign="center">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            ProfileInfo
          </Text>
          <ProfileCard profileData={{username: user.username, email: user.email, profile_picture: user.profile_picture} } />
          <ProfileForm  profileInfo={user}/>
        </VStack>
      )}
      {activeItem === "payments" && (
        <VStack flex="2" align="stretch" p={4} textAlign="center">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Payment History
          </Text>
        </VStack>
      )}
    </HStack>
  );
};

export default Profile;

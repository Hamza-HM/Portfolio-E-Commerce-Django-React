import { Box, useColorMode } from "@chakra-ui/react";
import Hero from "../../layouts/home page/Hero";
import Feature from "../../layouts/home page/Feature";
import WebSection from "../../layouts/home page/WebSection";
import Sponsores from "../../layouts/home page/Sponsores";
import DesignSection from "../../layouts/home page/DesignSection";
import NewsLetter from "../../layouts/home page/NewsLetter";
import AdvertisingSection from "../../layouts/home page/AdvertisingSection";

const Home = () => {
  const { colorMode } = useColorMode();
  const textColor = { light: "gray.300", dark: "gray.200" };
  return (
    <Box color={textColor[colorMode]}>
      <Hero />
      <Feature />
      <WebSection />
      <Sponsores />
      <DesignSection />
      <NewsLetter />
      <AdvertisingSection />
    </Box>
  );
};

export default Home;

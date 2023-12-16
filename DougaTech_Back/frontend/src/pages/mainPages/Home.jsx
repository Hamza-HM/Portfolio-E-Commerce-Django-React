import {
  Box,
  useColorMode
} from '@chakra-ui/react'
import Hero from '../../layouts/homepage/Hero'
import Feature from '../../layouts/homepage/Feature'
import WebSection from '../../layouts/homepage/WebSection'
import Sponsores from '../../layouts/homepage/Sponsores'
import DesignSection from '../../layouts/homepage/DesignSection'
import NewsLetter from '../../layouts/homepage/NewsLetter'

const Home = () => {
  const {colorMode} = useColorMode();
  const textColor = { light: "gray.300", dark: "gray.200" };
  return (
    <Box color={textColor[colorMode]}>
    <Hero />
    <Feature />
    <WebSection />
    <Sponsores />
    <DesignSection />
    <NewsLetter />
    </Box>
  )
}

export default Home
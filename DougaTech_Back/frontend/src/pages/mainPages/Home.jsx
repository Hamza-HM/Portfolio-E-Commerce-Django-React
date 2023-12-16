import {
  Box,
  Text,
  VStack,
  useColorMode
} from '@chakra-ui/react'
import Hero from '../../layouts/homepage/Hero'
import Feature from '../../layouts/homepage/Feature'
import WebSection from '../../layouts/homepage/WebSection'
import Sponsores from '../../layouts/homepage/Sponsores'
import DesignSection from '../../layouts/homepage/DesignSection'

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
    </Box>
  )
}

export default Home
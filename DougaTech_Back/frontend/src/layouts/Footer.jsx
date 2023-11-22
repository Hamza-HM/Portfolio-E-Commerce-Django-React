import { Box, Center, Text, useColorMode } from '@chakra-ui/react';

const Footer = () => {
    const { colorMode } = useColorMode();
    const bgColor = {light: 'gray.200', dark: 'gray.500'}
    const textColor = {light: 'gray.500', dark: 'gray.100'}
    return (
    <Box as="footer" py={6} bg={bgColor[colorMode]} h='300px'>
      <Center h='100%'>
        <Text fontSize="sm">
          This is a simple footer using Chakra UI
        </Text>
      </Center>
    </Box>
  );
};

export default Footer;

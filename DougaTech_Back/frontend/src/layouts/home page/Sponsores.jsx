import {Center, Box, Flex, Text} from '@chakra-ui/react'
const DesignSection = () => {
  return (
    <Center my='10px' color='gray'>
        <Flex gap={20} alignItems='center' justifyContent='center' flexWrap='wrap' mx='60px'>
        <Text>Douga</Text>
        <Text>Naga</Text>
        <Text>Vaga</Text>
        <Text>Vivorio</Text>
        <Text>Montirack</Text>
        </Flex>
    </Center>
  )
}

export default DesignSection
import { Box, Image, Heading, Text } from '@chakra-ui/react';

const PersonCard = ({ member }) => {
  const { name, position, description, image } = member;

  return (
    <Box boxShadow="lg" p="4" textAlign="center" >
      <Image src={image} alt={name} borderRadius="full" boxSize="200px" mx="auto" my="3" />
      <Heading as="h3" fontSize="xl" mb="2">
        {name}
      </Heading>
      <Text fontSize="md" fontWeight="500" mb="2">
        {position}
      </Text>
      <Text fontSize="md">
        {description}
      </Text>
    </Box>
  );
};

export default PersonCard;

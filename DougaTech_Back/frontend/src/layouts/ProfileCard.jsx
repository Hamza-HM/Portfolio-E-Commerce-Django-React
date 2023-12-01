import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";

const ProfileCard = ({profileData}) => {
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
      {profileData && (
        <VStack align="center" spacing={2} pt={2}>
            <Image src={profileData.profile_picture} alt='Profile Picture' w='200px' rounded='full' border='1px solid grey'/>
          <Text fontSize="md">{`username: ${profileData.username}`}</Text>
          <Text fontSize="md">{`email: ${profileData.email}`}</Text>
        </VStack>
      )}
    </Box>
  );
};

export default ProfileCard;

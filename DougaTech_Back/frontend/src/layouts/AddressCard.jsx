import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const AddressCard = ({ addrData }) => {
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
      {addrData && (
        <VStack align="flex-start" spacing={2} pt={2}>
          <Text fontSize="md">{`Street: ${addrData.street_address}`}</Text>
          <Text fontSize="md">{`Country: ${
            CountryList && CountryList.data[addrData.country]
          }`}</Text>
          <Text fontSize="md">{`Zip: ${addrData.zip}`}</Text>
          <Text fontSize="md">{`Default: ${addrData.default_addr}`}</Text>
          <Button size="sm" colorScheme="blue" mt={2}>
            Update Address
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default AddressCard;

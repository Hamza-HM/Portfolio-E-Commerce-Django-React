import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";
const AddrTabPanel = ({ addressData }) => {
  return (
    <>
      <AddressCard addrData={addressData} />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Billind Address</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <AddressForm
                selectedAddress={addressData}
                formType={
                  addressData?.address_type === "B" ? UPDATE_FORM : CREATE_FORM
                }
                activeItem="Billing Address"
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default AddrTabPanel;

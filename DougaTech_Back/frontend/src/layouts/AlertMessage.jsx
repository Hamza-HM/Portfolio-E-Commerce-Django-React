import {
    useDisclosure,
    Alert,
    AlertIcon,
    Box,
    AlertTitle,
    AlertDescription,
    CloseButton,
    Button,
  } from "@chakra-ui/react";

  const AlertMessage = () => {
    const { isOpen: isVisible, onOpen, onClose } = useDisclosure();

    return (
      <>
        {isVisible ? (
          <Alert status="success">
            <AlertIcon />
            <Box>
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your application has been received. We will review your application
                and respond within the next 48 hours.
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClose}
            />
          </Alert>
        ) : (
          <Button onClick={onOpen}>Show Alert</Button>
        )}
      </>
    );
  };

  export default AlertMessage;

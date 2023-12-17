import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ProductHero = () => {
  return (
    <>
      <Flex
        h="40vh"
        pt="60px"
        backgroundImage="https://img.freepik.com/photos-gratuite/composition-du-panier-vendredi-noir-espace-copie_23-2148667046.jpg?w=1380&t=st=1702806946~exp=1702807546~hmac=ebc2f15bbdc969b47855a07fbcaed63c6ff29e3923d0e5bdb84e4adefaabd225"
        backgroundPosition='center'
        backgroundSize='cover'
        alignItems='center'
        justifyContent='center'
        color='white'
      >
        <VStack>
        <Heading textAlign='right'>Enjoy your shopping!</Heading>
        <Text>Yaaay!</Text>
        </VStack>
      </Flex>
    </>
  );
};

export default ProductHero;

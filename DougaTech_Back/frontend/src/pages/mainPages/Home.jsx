import { useRef } from "react";
import Feature from "../../layouts/homepage/Feature";
import Hero from "../../layouts/homepage/Hero";
import { Box, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useScroll, motion, useTransform } from "framer-motion";
const Home = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "130%"]);
  return (
    <>
      <Box
        ref={ref}
        position="relative"
        w="full"
        h="138vh"
        display="grid"
        alignItems="top"
        justifyContent="center"
        overflow="hidden"
      >
        <motion.h1 style={{ y: textY }} className="heading-parallax">
          Parallax
        </motion.h1>
        <motion.div
          style={{ y: backgroundY }}
          className="image-parallax"
        ></motion.div>
        <Box
          position="absolute"
          inset={0}
          zIndex={50}
          h="100%"
          backgroundImage={"url(../../../public/0.png)"}
          backgroundSize="cover"
          backgroundPosition="center"
        ></Box>
        {/* <Hero />
        <Feature /> */}
      </Box>
      <Box w="100%" display="flex" justifyContent="center">
        <VStack
          pt="20px"
          zIndex="1"
          w="1000px"
          spacing={20}
          maxW="800px"
          display="flex"
          justifyContent="center"
        >
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            blanditiis eligendi accusamus aspernatur voluptatem non
            exercitationem delectus incidunt id, et ut nihil excepturi dolor
            velit adipisci, dicta harum similique totam? exercitationem delectus
            incidunt id, et ut nihil excepturi dolor velit adipisci, dicta harum
            similique totam?
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            blanditiis eligendi accusamus aspernatur voluptatem non
            exercitationem delectus incidunt id, et ut nihil excepturi dolor
            velit adipisci, dicta harum similique totam? exercitationem delectus
            incidunt id, et ut nihil excepturi dolor velit adipisci, dicta harum
            similique totam?
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            blanditiis eligendi accusamus aspernatur voluptatem non
            exercitationem delectus incidunt id, et ut nihil excepturi dolor
            velit adipisci, dicta harum similique totam? exercitationem delectus
            incidunt id, et ut nihil excepturi dolor velit adipisci, dicta harum
            similique totam?
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            blanditiis eligendi accusamus aspernatur voluptatem non
            exercitationem delectus incidunt id, et ut nihil excepturi dolor
            velit adipisci, dicta harum similique totam? exercitationem delectus
            incidunt id, et ut nihil excepturi dolor velit adipisci, dicta harum
            similique totam?
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            blanditiis eligendi accusamus aspernatur voluptatem non
            exercitationem delectus incidunt id, et ut nihil excepturi dolor
            velit adipisci, dicta harum similique totam? exercitationem delectus
            incidunt id, et ut nihil excepturi dolor velit adipisci, dicta harum
            similique totam?
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            blanditiis eligendi accusamus aspernatur voluptatem non
            exercitationem delectus incidunt id, et ut nihil excepturi dolor
            velit adipisci, dicta harum similique totam? exercitationem delectus
            incidunt id, et ut nihil excepturi dolor velit adipisci, dicta harum
            similique totam?
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default Home;

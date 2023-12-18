import { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useScroll, motion, useTransform } from "framer-motion";
const Home = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  return (
    <>
      <Box
        ref={ref}
        position="relative"
        w="full"
        h="100vh"
        display="grid"
        alignItems="top"
        justifyContent="center"
        overflow="hidden"
      >
        <motion.h1 style={{ y: textY, color: 'white' }} className="heading-parallax">
          Parallax
        </motion.h1>
        <motion.div
          style={{ y: backgroundY }}
          className="image-parallax"
        ></motion.div>
        <Box
          position="absolute"
          inset={0}
          zIndex={1}
          backgroundImage={"url(/0.png)"}
          backgroundSize="cover"
          backgroundPosition="bottom"
        ></Box>
      </Box>
    </>
  );
};

export default Home;

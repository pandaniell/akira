import { Image } from "@chakra-ui/image"
import { Box, Center, Container, Text } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import { useTransform, useViewportScroll } from "framer-motion"
import MotionBox from "./MotionBox"

const Features = () => {
  const { scrollYProgress } = useViewportScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [0, 0, 1])

  return (
    <MotionBox h="100vh" style={{ opacity }}>
      <Container maxW="4xl" as={Center} justifyContent="space-between" h="100%">
        <Box color="white" pr="3rem">
          <chakra.h1
            fontSize={{ base: "2.25rem", sm: "2.25rem", lg: "3rem" }}
            fontWeight="extrabold"
            mb="16px"
            lineHeight="1.2"
          >
            Unlimited potentials with
            <Box
              as="span"
              bgGradient="linear-gradient(90deg, #007CF0, #00DFD8)"
              bgClip="text"
            >
              {" "}
              unique features.
            </Box>
          </chakra.h1>
          <Text
            maxW="560px"
            mx="auto"
            fontSize={{ base: "lg", lg: "xl" }}
            mt="6"
          >
            Add Akira to your server and get access to your personal dashboard
            to fully control how Akira behaves in your server.
          </Text>
        </Box>
        <Image
          src="https://46dtbf3k4dl51vghpj6qqocj-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/dark-placeholder.png"
          alt="feature"
          w="90%"
        />
      </Container>
    </MotionBox>
  )
}

export default Features

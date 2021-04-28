import { Fragment } from "react"
import { Image } from "@chakra-ui/image"
import { Box, Center, Heading } from "@chakra-ui/layout"
import { useTransform, useViewportScroll } from "framer-motion"
import Head from "next/head"
import Dashboard from "../components/Dashboard"
import Features from "../components/Features"
import Header from "../components/Header"
import MotionBox from "../components/MotionBox"

const Home = () => {
  const { scrollYProgress } = useViewportScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 200])

  return (
    <Fragment>
      <Head>
        <title>Akira - a multipurpose Discord bot.</title>
        <meta
          name="description"
          content="🤖 Akira is a multipurpose Discord bot."
        />
      </Head>
      <Header />
      <Box h="100vh">
        <Center
          h="100%"
          flexDir="column"
          bgImage="linear-gradient(#1c0538, #090312)"
        >
          <MotionBox style={{ opacity, y }}>
            <Center pos="relative" minH="100vh" flexDir="column">
              <Heading
                as="h2"
                size="3xl"
                bgGradient="linear-gradient(90deg, #007CF0, #00DFD8)"
                bgClip="text"
              >
                Akira
              </Heading>
              <Heading color="white" mt="1.5rem">
                A multipurpose Discord bot.
              </Heading>
              <Center pos="absolute" bottom={0}>
                <Image
                  d="flex"
                  alignItems="center"
                  maxH="auto"
                  m="auto"
                  src="/static/images/akira.png"
                  alt="akira"
                  w={{ base: "100%", md: "60%", lg: "80%" }}
                />
              </Center>
            </Center>
          </MotionBox>
          <Dashboard />
        </Center>
      </Box>
      <Features />
    </Fragment>
  )
}

export default Home

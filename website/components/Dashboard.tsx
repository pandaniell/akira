import { FC, ReactNode, useEffect, useState } from "react"
import { Image } from "@chakra-ui/image"
import { Box, BoxProps, Center, Flex } from "@chakra-ui/layout"
import { MotionValue, useTransform, useViewportScroll } from "framer-motion"
import MotionBox from "./MotionBox"

type WithChildren<T = Record<string, unknown>> = T &
  Record<"children", ReactNode>

const HeadingBig = (props: BoxProps) => (
  <Box bgColor="#1e0f39" h="20px" m="24px" borderRadius="20px" {...props} />
)

const HeadingSmall = () => (
  <Box
    className="gradient-animation"
    bgColor="white"
    w="90px"
    h="12px"
    borderRadius="20px"
    m="16px 24px"
  />
)

const Row = ({ mt, children }: WithChildren<Partial<Record<"mt", string>>>) => (
  <Flex
    direction="row"
    align="center"
    justify="space-between"
    {...(mt && { mt })}
  >
    {children}
  </Flex>
)

const CircleSmall = () => (
  <Box bgColor="#1e0f39" w="24px" h="24px" mr="24px" borderRadius="50%" />
)

const VoiceChannel = ({ bgColor, ...props }: BoxProps) => (
  <Box
    bgColor={bgColor}
    w="124px"
    h="12px"
    borderRadius="20px"
    m="24px"
    {...props}
  />
)

const ProfileCircle: FC = ({ children }) => (
  <Box pos="relative" w="32px" h="32px" borderRadius="50%" bgColor="#1e0f39">
    {children}
  </Box>
)

const Text = ({
  small,
  ...props
}: Partial<Record<"small", boolean>> & BoxProps) => (
  <Box
    bg="linear-gradient(to right, #1e0f39, rgba(15, 30, 57, .5))"
    w={small ? "148px" : "278px"}
    h="10px"
    m="8px 0 8px 16px"
    borderRadius="20px"
    {...props}
  />
)

const Text2 = ({ small }: Partial<Record<"small", boolean>>) => (
  <Text
    className="gradient-animation"
    w={small ? "148px" : "160px"}
    m="8px 0"
    mr="32px"
  />
)

const Text3 = ({ small }: Partial<Record<"small", boolean>>) => (
  <Text
    className="gradient-animation"
    w={small ? "48px" : "80px"}
    height="8px"
  />
)

const JoinButton = ({
  opacity,
  children,
}: WithChildren<Record<"opacity", MotionValue<number>>>) => (
  <MotionBox
    className="gradient-animation"
    bgColor="#56EEAE"
    borderRadius="8px"
    cursor="pointer"
    fontSize="1em"
    p="15px 40px"
    color="white"
    fontWeight={700}
    style={{ opacity, transition: "visibility 0s, opacity .5s linear" }}
  >
    {children}
  </MotionBox>
)

const Chat = () => (
  <Flex align="center" m="40px 0">
    <ProfileCircle />
    <Box>
      <Text small />
      <Text />
    </Box>
  </Flex>
)

const ProfileSkeleton = ({ bgColor }: Partial<Record<"bgColor", string>>) => (
  <Flex align="center" justify="space-between" m="0 0 24px 0">
    <ProfileCircle>
      <Box
        pos="absolute"
        w="7px"
        h="7px"
        bgColor={bgColor ?? "#79ff87"}
        border="solid 1px #322641"
        bottom={0}
        right="2px"
        borderRadius="50px"
      />
    </ProfileCircle>
    <Box>
      <Text3 small />
      <Text3 />
    </Box>
  </Flex>
)

const CircleChannel = (props: BoxProps) => (
  <Box
    bgColor="#1e0f39"
    w="42px"
    h="42px"
    borderRadius="50%"
    mb="36px"
    {...props}
  />
)

const LeftPanel = () => {
  const { scrollYProgress } = useViewportScroll()
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0.8, 1])
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  return (
    <MotionBox
      pos="absolute"
      top={0}
      left={0}
      bgColor="#15072a"
      w="234px"
      h="546px"
      mt="54px"
      style={{ scale, x, opacity }}
    >
      <HeadingBig w="96px" />
      <HeadingBig
        className="gradient-animation"
        w="114px"
        bgColor="white"
        opacity=".8"
      />
      <HeadingBig w="126px" />
      <HeadingBig w="96px" />
      <HeadingBig w="114px" />
      <Flex direction="column">
        <HeadingSmall />
        <Row>
          <HeadingSmall />
          <CircleSmall />
        </Row>
        <Row>
          <HeadingSmall />
          <CircleSmall />
          <CircleSmall />
        </Row>
      </Flex>
      <VoiceChannel bgColor="#1e0f39" />
      <VoiceChannel bgColor="#1e0f39" />
      <VoiceChannel bgColor="#1e0f39" />
      <Row mt="-24px">
        <VoiceChannel className="gradient-animation" bgColor="#56eeae" />
        <Box
          className="gradient-animation"
          bgColor="#56eeae"
          w="24px"
          h="24px"
          mr="24px"
          borderRadius="20%"
        />
      </Row>
    </MotionBox>
  )
}

const MiddlePanel = () => {
  const { scrollYProgress } = useViewportScroll()
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0.2, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [-400, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  return (
    <MotionBox
      p="24px"
      w="576px"
      h="564px"
      pos="absolute"
      top="20px"
      left="234px"
      style={{ scale, y }}
    >
      <Chat />
      <Center
        pos="relative"
        bgImage="linear-gradient(to right, #1e0f39, rgba(15, 30, 57, .5))"
        w="400px"
        h="100px"
        m={0}
        borderRadius="20px"
      >
        <Flex align="center" m="40px 0">
          <Box>
            <Text2 small />
            <Text2 />
          </Box>
          <JoinButton opacity={opacity}>Join</JoinButton>
        </Flex>
      </Center>
      <Chat />
      <Chat />
      <Chat />
      <Flex align="center" m="40px 0">
        <ProfileCircle />
        <Box>
          <Text small />
        </Box>
      </Flex>
    </MotionBox>
  )
}

const RightPanel = () => {
  const { scrollYProgress } = useViewportScroll()
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0.2, 1])
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, 0])
  const rotateZ = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 6, 0])

  return (
    <MotionBox
      borderRadius="12px"
      p="24px"
      shadow="10px 10px 70px rgba(0, 0, 0, .2)"
      border="solid .1px rgba(255, 255, 255, .3)"
      borderBottom="none"
      w="174px"
      h="564px"
      bgImage="linear-gradient(rgba(255, 255, 255, .3), rgba(255, 255, 255, 0))"
      pos="absolute"
      top="-36px"
      right="-36px"
      style={{ backdropFilter: "blur(10px)", scale, x, rotateZ }}
    >
      <Box
        bgColor="#1e0f39"
        opacity=".8"
        w="78px"
        h="10px"
        borderRadius="20px"
        mb="24px"
      />
      <ProfileSkeleton />
      <ProfileSkeleton />
      <ProfileSkeleton />
      <ProfileSkeleton bgColor="#FFE485" />
      <ProfileSkeleton bgColor="#EE5656" />
      <ProfileSkeleton />
      <ProfileSkeleton bgColor="#FFE485" />
      <ProfileSkeleton bgColor="#EE5656" />
    </MotionBox>
  )
}

const LeftPanelGlass = () => {
  const { scrollYProgress } = useViewportScroll()
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0.2, 1])
  const x = useTransform(scrollYProgress, [0, 0.1, 0.1], [-300, 0, 0])
  const rotateZ = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 3, 0])

  return (
    <MotionBox
      as={Flex}
      borderRadius="12px"
      p="24px"
      style={{ backdropFilter: "blur(10px)", scale, x, rotateZ }}
      shadow="10px 10px 70px rgba(0, 0, 0, .2)"
      border="solid 0.1px rgba(255, 255, 255, .3)"
      borderBottom="none"
      flexDir="column"
      alignItems="center"
      w="90px"
      h="564px"
      bgImage="linear-gradient(rgba(255, 255, 255, .3), rgba(255, 255, 255, 0))"
      pos="absolute"
      top="36px"
      left="-42px"
    >
      <CircleChannel />
      <CircleChannel
        className="gradient-animation"
        w="48px"
        h="48px"
        bgColor="rgba(23, 183, 185, 0.2)"
        borderRadius="8px"
      >
        <Image
          src="/static/images/akira.png"
          alt="akira"
          maxH="100%"
          maxW="100%"
        />
      </CircleChannel>
      <CircleChannel />
      <CircleChannel />
      <CircleChannel />
      <CircleChannel />
    </MotionBox>
  )
}

const Dashboard = () => {
  const [visibility, setVisibility] = useState<VisibilityState>("visible")
  const { scrollYProgress } = useViewportScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0])

  useEffect(() => {
    const handleScroll = () => {
      if (Math.round(opacity.get()) >= 0.5) {
        setVisibility("visible")
      } else {
        setVisibility("hidden")
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [opacity])

  return (
    <MotionBox
      id="dashboard"
      as={Center}
      pos="fixed"
      zIndex={99}
      mt="16vh"
      w="984px"
      maxW="984px"
      h="612px"
      maxH="612px"
      border="1px solid rgba(255, 255, 255, .1)"
      borderBottom="none"
      borderRadius="16px"
      style={{ opacity, visibility }}
    >
      <Flex
        align="center"
        justify="space-between"
        pos="absolute"
        top={0}
        p="16px"
        w="100%"
        borderRadius="16px 16px 0px 0px"
        bgColor="#120425"
      >
        <Flex align="center">
          <Box
            bgColor="#1e0f39"
            w="132px"
            h="24px"
            borderRadius="20px"
            mr="16px"
          />
          <Box bgColor="#1e0f39" w="24px" h="24px" borderRadius="20%" />
        </Flex>
        <Flex align="center">
          <Box
            bgColor="#1e0f39"
            w="24px"
            h="24px"
            mr="16px"
            borderRadius="50%"
          />
          <Box
            bgColor="#1e0f39"
            w="240px"
            h="24px"
            borderRadius="20px"
            mr="16px"
          />
          <Box bgColor="#1e0f39" w="240px" h="14px" borderRadius="20px" />
        </Flex>
      </Flex>
      <LeftPanel />
      <MiddlePanel />
      <RightPanel />
      <LeftPanelGlass />
    </MotionBox>
  )
}

export default Dashboard

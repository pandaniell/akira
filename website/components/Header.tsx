import {
  chakra,
  Container,
  Image,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react"
import NextChakraLink from "./NextChakraLink"

const Header = () => (
  <chakra.header pos="fixed" w="100%" py={{ base: "1rem", sm: "1.5rem" }}>
    <Container maxW="5xl" d="flex" alignItems="center">
      <NextChakraLink href="/" maxW="80px">
        <Image
          src="/static/images/logo.svg"
          alt="Akira logo"
          w="80px"
          maxW="100%"
        />
      </NextChakraLink>
      <chakra.nav ml="auto">
        <UnorderedList
          d="flex"
          flexWrap="wrap"
          pl={0}
          mb={0}
          listStyleType="none"
          fontWeight="bold"
          color="white"
        >
          <ListItem d="flex" alignItems="center" pr="1rem">
            <NextChakraLink href="/">Home</NextChakraLink>
          </ListItem>
        </UnorderedList>
      </chakra.nav>
    </Container>
  </chakra.header>
)

export default Header

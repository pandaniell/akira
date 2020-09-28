import {
  Box,
  ChakraProvider,
  Code,
  CSSReset,
  Grid,
  Link,
  Text,
  VStack,
} from "@chakra-ui/core";
import theme from "@chakra-ui/theme";
import React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);

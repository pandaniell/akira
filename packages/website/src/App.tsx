import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import theme from "@chakra-ui/theme";
import { Home } from "pages/Home";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  </ChakraProvider>
);

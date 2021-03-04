import { Fragment } from "react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { createGlobalStyle, ThemeProvider } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const theme = {
  colors: {
    primary: "#0070f3",
  },
}

const App = ({ Component, pageProps }: AppProps) => (
  <Fragment>
    <Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
    </Head>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </Fragment>
)

export default App

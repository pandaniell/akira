import { Fragment } from "react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { GlobalStyles } from "../globalStyle"
import { ThemeProvider } from "../ThemeProvider"
import { darkTheme } from "../design/theme"

const App = ({ Component, pageProps }: AppProps) => (
  <Fragment>
    <Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
    </Head>
    <GlobalStyles />
    <ThemeProvider theme={darkTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </Fragment>
)

export default App

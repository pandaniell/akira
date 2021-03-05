import { Fragment } from "react"
import Head from "next/head"
import Hero from "../components/Hero"

const Home = () => (
  <Fragment>
    <Head>
      <title>Home - Akira</title>
      <meta
        name="description"
        content="🤖 Akira is a multipurpose Discord bot."
      />
    </Head>
    <Hero />
  </Fragment>
)

export default Home

import { Fragment } from "react"
import Head from "next/head"
import styled from "styled-components"

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const Home = () => (
  <Fragment>
    <Head>
      <title>Home - Akira</title>
      <meta
        name="description"
        content="🤖 Akira is a multipurpose Discord bot."
      />
    </Head>
    <Title>My page</Title>
  </Fragment>
)

export default Home

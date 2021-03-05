import React from "react"
import Header from "./Header"
import { motion, useViewportScroll, useTransform } from "framer-motion"
import styled from "styled-components"
import Dashboard from "./Dashboard"
import Features from "./Features"

const SceneStyle = styled.div`
  height: 100vh;
  background-image: linear-gradient(#1c0538, #090312);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 0;
  @media only screen and (min-width: 320px) and (max-width: 540px) {
    /* position: relative; */
  }
`

const HeroContainerStyle = styled.div`
  height: 100vh;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

const Heading = styled.h1`
  font-size: 4.5em;
  line-height: 1.1;
  text-align: center;
  font-weight: 900;
  color: white;

  @media (max-width: 425px) {
    font-size: 2.5em;
  }
  @media only screen and (min-width: 425px) and (max-width: 620px) {
    font-size: 3.2em;
  }
  @media (min-width: 1024px) {
    font-size: 4.5em;
  }
`

const Subheading = styled.p`
  font-size: 1.6em;
  line-height: 1;
  text-align: center;
  font-weight: 600;
  color: white;
  margin-bottom: -3vh;
  @media (max-width: 425px) {
    font-size: 1em;
    margin-bottom: -2vh;
  }

  @media only screen and (min-width: 425px) and (max-width: 620px) {
    font-size: 1.2em;
  }
  @media only screen and (min-width: 800px) and (max-width: 1024px) {
    font-size: 1.6em;
    margin-bottom: -2vh;
  }
`

const ImageContainer = styled.img`
  display: flex;
  align-items: center;
  max-height: auto;
  /* height: auto; */
  width: 60%;
  margin: auto;
  @media only screen and (min-width: 0px) and (max-width: 425px) {
    width: 100%;
  }
  @media only screen and (min-width: 425px) and (max-width: 620px) {
    width: 80%;
  }

  @media only screen and (min-width: 620px) and (max-width: 800px) {
    width: 60%;
  }
  @media only screen and (min-width: 800px) and (max-width: 1024px) {
    width: 60%;
  }
`

const Hero_heading = styled(motion.div)`
  @media (min-width: 425px) {
    margin-top: 18vh;
  }
  @media only screen and (min-width: 800px) and (max-width: 1024px) {
    margin-top: 16vh;
  }
`

const Hero = () => {
  const { scrollYProgress } = useViewportScroll()
  const yPosAnim = useTransform(scrollYProgress, [0, 0.2], [0, 200])
  const opac = useTransform(scrollYProgress, [0, 0.05], [1, 0])

  return (
    <>
      <Header />
      {/* <Scroll /> */}
      <div className="scene" style={{ height: "100vh" }}>
        <SceneStyle>
          <motion.div
            className="Hero__wrapper"
            style={{
              y: yPosAnim,
              opacity: opac,
            }}
          >
            <HeroContainerStyle>
              <motion.div className="Hero__container">
                <Hero_heading>
                  <Subheading>Javascript Bot</Subheading>
                  <Heading>
                    A Multipurpose<br></br>
                    <tspan style={{ color: "#81FFE8" }}>Discord</tspan> Bot
                  </Heading>
                </Hero_heading>
              </motion.div>
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: 0,
                }}
                animate={{ y: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, loop: Infinity, ease: "linear" }}
              >
                <ImageContainer
                  className="image__container"
                  src="https://i.ibb.co/WFTHSfz/akira.png"
                  alt="akira"
                />
              </motion.div>
            </HeroContainerStyle>
          </motion.div>
          <Dashboard />
        </SceneStyle>
      </div>
      <Features />
    </>
  )
}

export default Hero

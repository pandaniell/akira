import styled from "styled-components"
import { motion } from "framer-motion"

export const Logo = styled(motion.div)`
  margin: 0;
  height: 140px;
  width: 140px;
  padding: 24px 0px;
  line-height: 2.5rem;
  font-size: 1.2em;
  color: white;
`

export const FlexNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: 0px 20vw;
  z-index: 199;
  @media only screen and (min-width: 320px) and (max-width: 640px) {
    margin: 0px 10vw;
  }
`

export const IconBox = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
`

export const FLexRight = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
  color: white;
  @media (max-width: 768px) {
    display: none;
  }
`

export const FlexHeading = styled.div`
  display: flex;
  align-items: center;
`

export const Button = styled.button`
  border-radius: 8px;
  font-size: 1em;
  font-weight: 700;
  padding: 20px 25px;
  color: #1c0538;
  background-color: white;
  transition: all 0.4s;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    background-color: #81ffe8;
  }
  @media (max-width: 425px) {
    padding: 16px 25px;
  }
  @media (max-width: 800px) {
    padding: 16px 0px;
  }
  @media (max-width: 1024px) {
    padding: 15px 20px;
  }
`

export const MenuItemText = styled.div`
  position: relative;
  z-index: 5;
  font-size: 1.2em;
  transition: all 0.4s;

  &:hover {
    cursor: pointer;
    color: #81ffe8;
  }
  @media (max-width: 425px) {
    font-size: 1em;
  }
  @media (max-width: 800px) {
    font-size: 1em;
  }
  @media (max-width: 1024px) {
    font-size: 1em;
  }
`

export const MenuItem = styled.a`
  margin-right: 80px;
  line-height: 0;
  &:nth-last-child(1) {
    margin-right: 0px;
  }
`

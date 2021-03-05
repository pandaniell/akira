import { motion } from "framer-motion"
import styled from "styled-components"

export const ButtonContainer = styled(motion.div)`
  position: absolute;
  z-index: 99;
  margin-left: 32px;
`

export const NavContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  padding: 16px;
  width: 100%;
  border-radius: 16px 16px 0px 0px;
  background-color: #120425;
  -webkit-border-radius: 16px 16px 0px 0px;
  -moz-border-radius: 16px 16px 0px 0px;
  -ms-border-radius: 16px 16px 0px 0px;
  -o-border-radius: 16px 16px 0px 0px;
`

export const NavLayerLeft = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Circle = styled(motion.div)`
  background-color: ${props => props.theme.main.dashboardDark};
  width: 24px;
  height: 24px;
  border-radius: 20%;
  -webkit-border-radius: 20%;
  -moz-border-radius: 20%;
  -ms-border-radius: 20%;
  -o-border-radius: 20%;
  // margin-right: 126px;
`
export const Heading = styled(motion.div)`
  background-color: ${props => props.theme.main.dashboardDark};
  width: 132px;
  height: 24px;
  border-radius: 20px;
  margin-right: 16px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  -o-border-radius: 20px;
`
export const NavLayerRight = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Circle2 = styled(motion.div)`
  background-color: ${props => props.theme.main.dashboardDark};
  width: 24px;
  height: 24px;
  margin-right: 16px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
`

export const Heading2 = styled(motion.div)`
  background-color: ${props => props.theme.main.dashboardDark};
  width: 240px;
  height: 24px;
  border-radius: 20px;
  margin-right: 16px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  -o-border-radius: 20px;
`

export const SubHeading2 = styled(motion.div)`
  background-color: ${props => props.theme.main.dashboardDark};
  width: 240px;
  height: 14px;
  border-radius: 20px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  -o-border-radius: 20px;
`

export const LeftPanelStyle = styled(motion.div)`
  width: 234px;
  height: 546px;
  background-color: #15072a;
  position: absolute;
  z-index: -1;
  margin-top: 54px;
  top: 0;
  left: 0;
`

export const HeadingBig = styled(motion.div)`
  background-color: ${props => props.theme.main.dashboardDark};
  width: 114px;
  height: 20px;
  margin: 24px;
  border-radius: 20px;
  &:nth-child(1) {
    width: 96px;
  }
  &:nth-child(3) {
    width: 126px;
  }
  &:nth-child(4) {
    width: 96px;
  }
`

export const HeadingBigMain = styled(HeadingBig)`
  background-color: white;
  opacity: 0.8;
`
export const HeadingSmall = styled(motion.div)`
  background-color: white;
  width: 72px;
  height: 12px;
  border-radius: 20px;
  margin: 16px 24px;
  &:nth-child(1) {
    width: 90px;
  }
`

export const CircleSmall = styled(motion.div)`
  background-color: ${props => props.theme.main.dashboardDark};
  width: 24px;
  height: 24px;
  margin-right: 24px;
  border-radius: 50%;
`
export const VoiceChannel = styled(motion.div)`
  display: flex;
  flex-direction: column;
`

export const Row = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.mt || "null"};
`

export const VoiceChannel2 = styled(motion.div)`
  background-color: ${props => props.theme.main.dashboardDark};
  width: 124px;
  height: 12px;
  border-radius: 20px;
  margin: 24px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  -o-border-radius: 20px;
`

export const VoiceChannelActive = styled(VoiceChannel2)`
  background-color: #56eeae;
`

export const CircleActive = styled.div`
  background-color: #56eeae;
  width: 24px;
  height: 24px;
  margin-right: 24px;
  border-radius: 20%;
  -webkit-border-radius: 20%;
  -moz-border-radius: 20%;
  -ms-border-radius: 20%;
  -o-border-radius: 20%;
`

// LeftpanelGlass
export const LeftPanelGlassStyle = styled(motion.div)`
  border-radius: 12px;
  padding: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 10px 10px 70px rgba(0, 0, 0, 0.2);
  border: solid 0.1px rgba(255, 255, 255, 0.3);
  border-bottom: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  height: 564px;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  position: absolute;
  top: 36px;
  left: -42px;
  z-index: 3;
`

export const CircleChannel = styled(motion.div)`
    background-color: ${props => props.theme.main.dashboardDark};
    width: 42px;
    height: 42px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    margin-bottom: 36px;
    }
    /* &.gradient{
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradient 2s ease infinite;
        -webkit-animation: gradient 2s ease infinite;
    }   */
`

export const CircleChannelMain = styled(CircleChannel)`
  width: 48px;
  height: 48px;
  background-color: rgba(23, 183, 185, 0.2);
  border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  -ms-border-radius: 8px;
  -o-border-radius: 8px;
`

// Middle panell

export const MiddleStyle = styled(motion.div)`
  padding: 24px;
  width: 576px;
  height: 564px;
  background-color: transparent;
  position: absolute;
  top: 20px;
  left: 234px;
  z-index: 3;
`
export const ProfileSkeleton = styled(motion.div)`
  display: flex;
  align-items: center;
  margin: 40px 0;
`

export const ProfileCircle = styled(motion.div)`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.inputColor || "#1e0f39"};
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
`

export const Text = styled(motion.div)`
  background: linear-gradient(to right, #1e0f39, rgba(15, 30, 57, 0.5));
  width: 278px;
  height: 10px;
  margin: 8px 0 8px 16px;
  border-radius: 20px;
  &:nth-of-type(2n + 1) {
    width: 148px;
  }
`

export const Text2 = styled(Text)`
  background-image: linear-gradient(
    to right,
    #1e0f39,
    rgba(255, 255, 255, 0.5)
  );
  width: 160px;
  margin: 8px 0;
  margin-right: 32px;
`

export const Text3 = styled(Text)`
  width: 80px;
  height: 8px;
  &:nth-of-type(2n + 1) {
    width: 48px;
  }
`

export const Box = styled(motion.div)`
  position: relative;
  background-image: linear-gradient(to right, #1e0f39, rgba(15, 30, 57, 0.5));
  width: 400px;
  height: 100px;
  margin: 0;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  -o-border-radius: 20px;
`

export const JoinButton = styled.button`
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  padding: 15px 40px;
  background-color: ${props => props.bg};
  color: white;
  font-weight: 700;
  transition: visibility 0s, opacity 0.5s linear;
`

//rightpanel

export const RightPanelStyle = styled(motion.div)`
  border-radius: 12px;
  padding: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 10px 10px 70px rgba(0, 0, 0, 0.2);
  border: solid 0.1px rgba(255, 255, 255, 0.3);
  border-bottom: none;
  width: 174px;
  height: 564px;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  position: absolute;
  top: -36px;
  right: -36px;
  z-index: 3;
`

export const HeadingSmallRight = styled(motion.div)`
  background-color: ${props => props.theme.main.dashboardDark};
  opacity: 0.8;
  width: 78px;
  height: 10px;
  border-radius: 20px;
  margin-bottom: 24px;
`

export const ProfileStatus = styled(motion.div)`
  position: absolute;
  width: 7px;
  height: 7px;
  background-color: ${props => props.inputColor || "#79ff87"};
  border: solid 1px #322641;
  bottom: 0;
  right: 2px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
`

export const ProfileSkeletonRight = styled(ProfileSkeleton)`
  margin: 0 0 24px 0;
  justify-content: space-between;
`

export const DashboardStyle = styled(motion.div)`
  position: fixed;

  margin-top: 16vh;
  width: 984px;
  max-width: 984px;
  max-height: 612px;
  height: 612px;
  display: flex;
  justify-content: center;
  align-self: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none;
  border-radius: 16px;
  z-index: 99;
  &:hover {
    ${HeadingBigMain}, ${HeadingSmall}, ${CircleChannelMain}, ${VoiceChannelActive}, ${CircleActive}, ${Text2}, ${JoinButton}, ${HeadingSmallRight}, ${Text3} {
      background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
      background-size: 400% 400%;
      animation: gradient 2s ease infinite;
      -webkit-animation: gradient 2s ease infinite;

      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    }
  }
  /* display: hide; */
  @media only screen and (min-width: 320px) and (max-width: 425px) {
    display: none;
  }
  @media only screen and (min-width: 425px) and (max-width: 540px) {
    transform: scale(0.45);
  }

  @media only screen and (min-width: 540px) and (max-width: 620px) {
    transform: scale(0.55);
    /* display: none; */
  }
  @media only screen and (min-width: 620px) and (max-width: 800px) {
    transform: scale(0.65);
  }
  @media (min-width: 800px) {
    transform: scale(0.8);
  }
  @media (min-width: 1024px) {
    transform: scale(1);
  }
`

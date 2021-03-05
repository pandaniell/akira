import { useTransform, useViewportScroll } from "framer-motion"
import React, { useEffect } from "react"
import * as SC from "./styles"

const Dashboard = () => {
  const [display, setDisplay] = React.useState("visible")
  const { scrollYProgress } = useViewportScroll()
  const opac = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0])

  useEffect(
    function mount() {
      function onScroll() {
        if (Math.round(opac.get()) >= 0.5) {
          setDisplay("visible")
        } else {
          setDisplay("hidden")
        }
      }

      window.addEventListener("scroll", onScroll)

      return function unMount() {
        window.removeEventListener("scroll", onScroll)
      }
    },
    [opac]
  )
  return (
    <SC.DashboardStyle
      className="Dashboard"
      style={{ opacity: opac, visibility: display }}
    >
      <div className="Background__layer" />
      <SC.NavContainer>
        <SC.NavLayerLeft>
          <SC.Heading />
          <SC.Circle />
        </SC.NavLayerLeft>
        <SC.NavLayerRight>
          <SC.Circle2 />
          <SC.Heading2 />
          <SC.SubHeading2 />
        </SC.NavLayerRight>
      </SC.NavContainer>
      <LeftPanel />
      <MiddlePanel />
      <RightPanel />
      <LeftPanelGlass />
    </SC.DashboardStyle>
  )
}

const LeftPanel = () => {
  const { scrollYProgress } = useViewportScroll()
  const scaleAnim = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0.8, 1])
  const xPosAnim = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, 0])
  const opac = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  return (
    <SC.LeftPanelStyle
      style={{
        scale: scaleAnim,
        x: xPosAnim,
        opacity: opac,
      }}
    >
      <SC.HeadingBig></SC.HeadingBig>
      <SC.HeadingBigMain></SC.HeadingBigMain>
      <SC.HeadingBig></SC.HeadingBig>
      <SC.HeadingBig></SC.HeadingBig>
      <SC.HeadingBig></SC.HeadingBig>
      <SC.VoiceChannel>
        <SC.HeadingSmall></SC.HeadingSmall>
        <SC.Row>
          <SC.HeadingSmall />
          <SC.CircleSmall></SC.CircleSmall>
        </SC.Row>
        <SC.Row>
          <SC.HeadingSmall></SC.HeadingSmall>
          <SC.CircleSmall></SC.CircleSmall>
          <SC.CircleSmall></SC.CircleSmall>
        </SC.Row>
      </SC.VoiceChannel>
      <SC.VoiceChannel2></SC.VoiceChannel2>
      <SC.VoiceChannel2></SC.VoiceChannel2>
      <SC.VoiceChannel2></SC.VoiceChannel2>
      <SC.Row mt="-24px">
        <SC.VoiceChannelActive></SC.VoiceChannelActive>
        <SC.CircleActive></SC.CircleActive>
      </SC.Row>
    </SC.LeftPanelStyle>
  )
}

const LeftPanelGlass = () => {
  const [ffLayer, setFfLayer] = React.useState(0)
  const { scrollYProgress } = useViewportScroll()
  const scaleAnim = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0.2, 1])
  const xPosAnim = useTransform(scrollYProgress, [0, 0.1, 0.1], [-300, 0, 0])
  const zRotAnim = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 3, 0])

  scrollYProgress.onChange(x => {
    setFfLayer(x > 0.4 ? -1 : 0)
  })
  return (
    <SC.LeftPanelGlassStyle
      style={{
        scale: scaleAnim,
        x: xPosAnim,
        rotateZ: zRotAnim,
      }}
    >
      <SC.CircleChannel />
      <SC.CircleChannelMain>
        <img
          src="https://i.ibb.co/WFTHSfz/akira.png"
          alt="akira"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      </SC.CircleChannelMain>
      <SC.CircleChannel />
      <SC.CircleChannel />
      <SC.CircleChannel />
      <SC.CircleChannel />
    </SC.LeftPanelGlassStyle>
  )
}

const MiddlePanel = () => {
  const { scrollYProgress } = useViewportScroll()
  const scaleAnim = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0.2, 1])
  const yPosAnim = useTransform(scrollYProgress, [0, 0.5], [-400, 0])
  const opac = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  return (
    <SC.MiddleStyle
      style={{
        scale: scaleAnim,
        y: yPosAnim,
      }}
    >
      <div className="headingSmall"></div>
      <SC.ProfileSkeleton>
        <SC.ProfileCircle />
        <div className="data-skeleton">
          <SC.Text />
          <SC.Text />
        </div>
      </SC.ProfileSkeleton>
      <SC.Box>
        <SC.ProfileSkeleton id="profile">
          <div className="profile-square "></div>
          <div className="data-skeleton">
            <SC.Text2></SC.Text2>
            <SC.Text2></SC.Text2>
          </div>

          <SC.JoinButton bg="#56EEAE" style={{ opacity: opac }} id="button">
            Join
          </SC.JoinButton>
        </SC.ProfileSkeleton>
      </SC.Box>
      <SC.ProfileSkeleton>
        <SC.ProfileCircle></SC.ProfileCircle>
        <div className="data-skeleton">
          <SC.Text></SC.Text>
          <SC.Text></SC.Text>
        </div>
      </SC.ProfileSkeleton>

      <SC.ProfileSkeleton>
        <SC.ProfileCircle></SC.ProfileCircle>
        <div className="data-skeleton">
          <SC.Text></SC.Text>
          <SC.Text></SC.Text>
        </div>
      </SC.ProfileSkeleton>

      <SC.ProfileSkeleton>
        <SC.ProfileCircle></SC.ProfileCircle>
        <div className="data-skeleton">
          <SC.Text></SC.Text>
          <SC.Text></SC.Text>
        </div>
      </SC.ProfileSkeleton>

      <SC.ProfileSkeleton>
        <SC.ProfileCircle></SC.ProfileCircle>
        <div className="data-skeleton">
          <SC.Text></SC.Text>
        </div>
      </SC.ProfileSkeleton>
    </SC.MiddleStyle>
  )
}

const ProfileSkeleton = props => {
  return (
    <SC.ProfileSkeletonRight>
      <SC.ProfileCircle>
        <SC.ProfileStatus inputColor={props.inputColor} />
      </SC.ProfileCircle>
      <div className="data-skeleton">
        <SC.Text3 />
        <SC.Text3 />
      </div>
    </SC.ProfileSkeletonRight>
  )
}

const RightPanel = props => {
  const [ffLayer, setFfLayer] = React.useState(0)
  const { scrollYProgress } = useViewportScroll()
  const scaleAnim = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0.2, 1])
  const xPosAnim = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, 0])
  const zRotAnim = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 6, 0])

  scrollYProgress.onChange(x => {
    setFfLayer(x > 0.4 ? -1 : 0)
  })

  return (
    <SC.RightPanelStyle
      style={{
        scale: scaleAnim,
        x: xPosAnim,
        rotateZ: zRotAnim,
      }}
    >
      <SC.HeadingSmallRight />
      <ProfileSkeleton isShown1={props.isShown} />
      <ProfileSkeleton isShown2={props.isShown} />
      <ProfileSkeleton isShown1={props.isShown} />
      <ProfileSkeleton inputColor="#FFE485" isShown1={props.isShown} />
      <ProfileSkeleton inputColor="#EE5656" isShown2={props.isShown} />
      <ProfileSkeleton isShown1={props.isShown} />
      <ProfileSkeleton inputColor="#FFE485" isShown2={props.isShown} />
      <ProfileSkeleton inputColor="#EE5656" isShown1={props.isShown} />
    </SC.RightPanelStyle>
  )
}

export default Dashboard

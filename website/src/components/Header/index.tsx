import React, { FC } from "react"
import * as SC from "./styles"

interface IMenuItemProps {
  to: string
}

const MenuItem: FC<IMenuItemProps> = ({ children, to }) => {
  return (
    <SC.MenuItem
      to={to}
      activeClassName="active"
      className={to === "/" ? "disabled" : ""}
    >
      <SC.MenuItemText>{children}</SC.MenuItemText>
    </SC.MenuItem>
  )
}

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
)

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
)

const Header = () => {
  const [show, setShow] = React.useState(false)
  const toggleMenu = () => setShow(!show)

  return (
    <SC.FlexNavContainer>
      <SC.FlexHeading>
        <SC.Logo
          animate={{ y: [0, 5, 0, -5, 0] }}
          transition={{ duration: 3, loop: Infinity, ease: "linear" }}
        >
          <img
            src="https://i.ibb.co/48HZKvs/logo.png"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </SC.Logo>
      </SC.FlexHeading>

      <SC.IconBox onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </SC.IconBox>

      <SC.FLexRight>
        <MenuItem to="/features">Features </MenuItem>
        <MenuItem to="/pricing">Pricing </MenuItem>
        <MenuItem to="/signup">
          <SC.Button>Login with discord</SC.Button>
        </MenuItem>
      </SC.FLexRight>
    </SC.FlexNavContainer>
  )
}

export default Header

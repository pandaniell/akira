import React, { FC } from "react"
import { ThemeProvider as BaseThemeProvider } from "styled-components"

import { darkTheme } from "./design/theme"

interface IScopedDownChildren {
  children: JSX.Element
}

const ThemeProvider: FC<IScopedDownChildren> = ({ children }) => {
  return <BaseThemeProvider theme={darkTheme}>{children}</BaseThemeProvider>
}

export { ThemeProvider }

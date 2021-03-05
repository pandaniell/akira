interface ISet {
  background: string
  gradient: string
  dashboardDark: string
  highlight: string
}

export interface ITheme {
  main: ISet & { link: string }
}

export const darkTheme: ITheme = {
  main: {
    background: "#1E0F3C",
    gradient: "linear-gradient(to right, #1e0f39, rgba(15, 30, 57, 0.5))",
    dashboardDark: "#1e0f39",
    highlight: "#81FFE8",
    link: "#fff",
  },
}

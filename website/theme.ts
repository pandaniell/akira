import { extendTheme, keyframes } from "@chakra-ui/react"

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#090312",
      },
      "#dashboard": {
        "&:hover": {
          ".gradient-animation": {
            background:
              "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
            backgroundSize: "400% 400%",
            animation: `${gradient} 2s ease infinite`,
          },
        },
      },
    },
  },
})

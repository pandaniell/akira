import type { PropsWithChildren } from "react"
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"

type NextChakraLinkProps = PropsWithChildren<
  NextLinkProps & Omit<ChakraLinkProps, "as">
>

const NextChakraLink = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...chakraProps
}: NextChakraLinkProps) => (
  <NextLink
    passHref={true}
    href={href}
    as={as}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
    prefetch={prefetch}
  >
    <ChakraLink {...chakraProps}>{children}</ChakraLink>
  </NextLink>
)

export default NextChakraLink

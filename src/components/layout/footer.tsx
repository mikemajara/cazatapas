import React, { ReactNode, useState } from "react";
import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image,
  HStack,
  useBreakpoint,
  Icon,
} from "@chakra-ui/react";
// icons
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";

const BREAKPOINT = "sm";
export const footerHeight = 120;
export const footerHeightBase = 160;

const Logo = (props: any) => {
  return (
    <HStack justify={{ base: "center", [BREAKPOINT]: "start" }}>
      <Image src="/logo.png" boxSize={8} />
      <Text fontWeight="light" fontSize="3xl">
        Cazatapa
      </Text>
    </HStack>
  );
};

const SocialButton = ({
  icon,
  href,
  colorScheme,
}: {
  icon: ReactNode;
  label: string;
  href: string;
  colorScheme?: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const toggleHover = () => setIsHovered(!isHovered);

  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target="blank"
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        bgColor: `${colorScheme}.100`,
        color: `${colorScheme}.600`,
      }}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      children={isHovered ? <BiLinkExternal /> : icon}
    />
  );
};

export function Footer() {
  const isDesktop = useBreakpoint("sm");
  return (
    <Stack
      h={`${!isDesktop ? footerHeight : footerHeightBase}px`}
      py={4}
      border="1px solid"
      borderColor="gray.300"
      bg={useColorModeValue("whiteAlpha.200", "gray.700")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("whiteAlpha.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"container.xl"}
          direction={{ base: "column", [BREAKPOINT]: "row" }}
          spacing={4}
          justify={{ base: "center", [BREAKPOINT]: "space-between" }}
          align={{ base: "center", [BREAKPOINT]: "center" }}
        >
          <Stack justify={{ base: "center", [BREAKPOINT]: "start" }}>
            <Logo />
            <Text>© 2020 Cazatapa. All rights reserved</Text>
          </Stack>
          <Stack direction={"row"} spacing={6}>
            {ICONS.map((e) => (
              <SocialButton key={e.label} {...e} />
            ))}
          </Stack>
        </Container>
      </Box>
    </Stack>
  );
}

const ICONS = [
  {
    label: "Twitter",
    href: "https://www.netflix.com/es-en/title/81254224",
    colorScheme: "blue",
    icon: <FaTwitter />,
  },
  {
    label: "YouTube",
    href: "https://www.netflix.com/es-en/title/81254224",
    colorScheme: "red",
    icon: <FaYoutube />,
  },
  {
    label: "Instagram",
    href: "/blog/no-social-media-statement",
    colorScheme: "purple",
    icon: <FaInstagram />,
  },
];

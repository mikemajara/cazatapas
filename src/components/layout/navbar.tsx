import React from "react";
import {
  Image,
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link as ChakraLink,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import NextLink from "next/link";
import { DarkModeSwitch } from "../dark-mode-switch";
import { AIcon } from "../chakra-animated-components";
import { isHotkeyPressed, useHotkeys } from "react-hotkeys-hook";

import { MdOutlineExplore } from "react-icons/md";
import { BiRegistered, BiTrendingUp } from "react-icons/bi";
import { RiHome2Line } from "react-icons/ri";
import { AiOutlineStar } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { useRouter } from "next/dist/client/router";
import { getSession, useSession } from "next-auth/react";
import { AccountComponent } from "../auth/account-component";

export const navbarHeight = 60;

export default function WithSubnavigation(props: any) {
  const { data: session, status } = useSession();
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isOpenMenu, onToggle: onToggleMenu } =
    useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        h={`${navbarHeight}px`}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon w={3} h={3} />
              ) : (
                <HamburgerIcon w={5} h={5} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
        >
          <ChakraLink
            href={"/"}
            textAlign={useBreakpointValue({
              base: "center",
              md: "left",
            })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Image boxSize="5" src={"/logo.png"} alt={"logo"} />
          </ChakraLink>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <DarkModeSwitch />
          <AccountComponent />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = (props: any) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue(
    "white",
    "gray.800",
  );
  const router = useRouter();
  useHotkeys("cmd+t", (e) => {
    e.preventDefault();
    console.log("cmd+t");
    router.push({
      pathname: "/settings",
    });
  });

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <ChakraLink
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </ChakraLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel, icon }: NavItem) => {
  return (
    <ChakraLink
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("red.200", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box w="full">
          <HStack align="center">
            {icon}
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "red.600" }}
              fontWeight={500}
            >
              {label}
            </Text>
          </HStack>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{
            opacity: "100%",
            transform: "translateX(0)",
          }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"red.600"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </ChakraLink>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={ChakraLink}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse
        in={isOpen}
        animateOpacity
        style={{ marginTop: "0!important" }}
      >
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <ChakraLink key={child.label} py={2} href={child.href}>
                {child.label}
              </ChakraLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  icon?: React.ReactElement;
}

const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: "Inspiration",
  //   children: [
  //     {
  //       label: "Explore items by categories",
  //       subLabel: "Explore tems by categories",
  //       href: "#",
  //       icon: <MdOutlineExplore />,
  //     },
  //     {
  //       label: "Trends",
  //       subLabel: "See the latest trends",
  //       href: "#",
  //       icon: <BiTrendingUp />,
  //     },
  //   ],
  // },
  {
    label: "Dishes",
    href: "/dishes",
  },
  {
    label: "Restaurants",
    href: "/restaurants",
  },
];

interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ReactElement;
  command?: string;
}

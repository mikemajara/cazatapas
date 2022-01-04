import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Text,
  Menu,
  MenuButton,
  Button,
  HStack,
  Avatar,
  Stack,
  MenuList,
  MenuDivider,
  MenuItem,
  useDisclosure,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { AIcon } from "../chakra-animated-components";
// icons
import { MdOutlineExplore } from "react-icons/md";
import { BiRegistered, BiTrendingUp } from "react-icons/bi";
import { RiHome2Line } from "react-icons/ri";
import { AiOutlineStar } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { useRouter } from "next/dist/client/router";

export function AccountComponent(props: any) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isDesktop = useBreakpointValue({ base: false, sm: true });
  const MENU_ITEMS: Array<any> = [
    {
      label: "Inicio",
      href: "/",
      icon: <RiHome2Line />,
      isVisible: !!session,
    },
    {
      label: "Mis Favoritos",
      href: "/dashboard",
      icon: <AiOutlineStar />,
      isVisible: !!session,
    },
    {
      label: "Guardados",
      href: "#",
      icon: <IoBookmarkOutline />,
      isVisible: !!session,
    },
    {
      label: "hr",
      isVisible: !!session,
    },
    {
      label: "Ajustes",
      href: "/settings",
      icon: <BsGear />,
      isVisible: true,
    },
    {
      label: "Register",
      href: "/auth/register",
      icon: <BiRegistered />,
      isVisible: !session,
    },
    {
      label: "Sign in",
      href: `/auth/signin?callbackUrl=${router.pathname}`,
      icon: <IoIosLogIn />,
      isVisible: !session,
    },
    {
      label: "Log out",
      onClick: () => {
        signOut({ callbackUrl: router.pathname });
      },
      icon: <IoIosLogOut />,
      isVisible: !!session,
    },
  ];

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <Menu>
      <MenuButton
        as={Button}
        // rounded={"full"}
        variant="ghost"
        cursor={"pointer"}
        minW={0}
        onClick={onToggle}
      >
        <HStack>
          {status === "loading" ? (
            <SkeletonCircle size="8" />
          ) : (
            <Avatar
              size={"xs"}
              name={session?.user.name || ""}
              src={session?.user.image}
            />
          )}
          {isDesktop && (
            <>
              <Stack minW="100">
                {status === "loading" ? (
                  <Skeleton h="20px" spacing="4" />
                ) : (
                  <Text fontSize={"sm"} fontWeight={"bold"}>
                    {session?.user.name ||
                      session?.user.email ||
                      "Fulanito"}
                  </Text>
                )}
              </Stack>
              <AIcon
                ml={2}
                as={ChevronDownIcon}
                animate={{ rotate: isOpen ? 180 : 0 }}
              />
            </>
          )}
        </HStack>
      </MenuButton>
      <MenuList p={2}>
        {MENU_ITEMS.map((item) => {
          if (item.isVisible) {
            return item.label == "hr" ? (
              <MenuDivider key={item.label} />
            ) : (
              <NextLink
                href={item.href || ""}
                passHref={!item.onClick}
                key={item.label}
              >
                <MenuItem
                  icon={item.icon}
                  command={item.command}
                  variant="ghost"
                  onClick={item.onClick}
                  as={Button}
                >
                  {item.label}
                </MenuItem>
              </NextLink>
            );
          }
        })}
      </MenuList>
    </Menu>
  );
}

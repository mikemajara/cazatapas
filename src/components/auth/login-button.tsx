import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { NextLink, ChakraLink } from "@lib/utils";
import { useRouter } from "next/router";
import { IoIosLogIn } from "react-icons/io";

export const LoginButton = (props) => {
  const router = useRouter();
  const { children = "Log in", ...rest } = props;
  return (
    <Flex justify="center" align="center" {...rest}>
      <NextLink
        href={`/auth/signin?callbackUrl=${router.asPath}`}
        passHref
      >
        <Button
          as={ChakraLink}
          iconLeft={<IoIosLogIn />}
          variant="outline"
        >
          {children}
        </Button>
      </NextLink>
    </Flex>
  );
};

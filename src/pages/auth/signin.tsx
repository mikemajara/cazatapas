import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  VStack,
  FormErrorMessage,
  Divider,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signIn, useSession } from "next-auth/react";
import { logger } from "@lib/logger";
import { each, forOwn, join } from "lodash";
import { useRouter } from "next/router";

//icons
import {
  AiFillGithub,
  AiFillGoogleCircle,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { FormPasswordlessEmail } from "@components/auth/form-passwordless";
import { FormProvider } from "@components/auth/form-provider";
import { AuthCredentials } from "@components/auth/form-credentials";

export default function AuthModal() {
  const { isOpen: isOpenCollapse, onToggle: onToggleCollapse } =
    useDisclosure();
  const { isOpen: isOpenEmail, onToggle: onToggleEmail } =
    useDisclosure();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/", {
        query: {
          callbackUrl: router.query.callbackUrl,
        },
      });
    }
  }, [status]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} minW="md">
        <Heading w="full" align="center" fontSize={"4xl"}>
          Sign in
        </Heading>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <VStack>
            {/* <FormPasswordlessEmail /> */}
            <FormProvider
              provider="twitter"
              callbackUrl={router.query.callbackUrl?.toString()}
              icon={<AiFillTwitterCircle />}
              label="Twitter"
            />
            <FormProvider
              provider="google"
              callbackUrl={router.query.callbackUrl?.toString()}
              icon={<AiFillGoogleCircle />}
              label="Google"
            />
            <AuthCredentials />
          </VStack>
        </Box>
      </Stack>
    </Flex>
  );
}

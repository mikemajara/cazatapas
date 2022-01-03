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
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { FormPasswordlessEmail } from "@components/auth/form-passwordless";
import { FormProvider } from "@components/auth/form-provider";
import { AuthCredentials } from "@components/auth/form-credentials";

export function AuthForm() {
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
    <VStack py={5} w="full">
      <Heading w="full" align="center" fontSize={"4xl"} mb={10}>
        Sign in
      </Heading>
      <FormPasswordlessEmail />
      <FormProvider
        provider="github"
        callbackUrl={router.query.callbackUrl?.toString()}
        icon={<AiFillGithub />}
        label="Github"
      />
      <AuthCredentials />
    </VStack>
  );
}

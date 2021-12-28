import React, { useState } from "react";
import {
  Box,
  Divider,
  Container,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  Stack,
  HStack,
  Button,
  InputGroup,
  InputRightElement,
  useBreakpointValue,
  ToastOptions,
  ToastPositionWithLogical,
} from "@chakra-ui/react";
import { MainPageLayout } from "../components/layout";
import { getSession, signIn, useSession } from "next-auth/react";
import ProtectedComponent from "../components/auth/protected-component";
import { logger } from "@lib/logger";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useUserData } from "src/hooks/useUserData";
import { useClipboard } from "@chakra-ui/react";
import _ from "lodash";
import { toast } from "@lib/toast";
import { IoMdRefresh } from "react-icons/io";
import { BiCopy } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";

export default function Settings({ session }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const toastPosition = useBreakpointValue<ToastPositionWithLogical>({
    base: "top",
    sm: "bottom-right",
  });

  const SectionContainer = (props) => (
    <Stack
      align="start"
      spacing={[10, 20]}
      justify="space-between"
      direction={["column", "row"]}
      {...props}
    />
  );

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { hasCopied, onCopy } = useClipboard(getValues("apiKey"));

  const { data, isLoading } = useUserData(session.user.id, reset);

  async function onSubmit(values) {
    try {
      // remove empty (unedited) values
      const body = { ..._.pickBy(values, _.identity) };

      const res = await fetch(`/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      toast.success("Profile updated", { position: toastPosition });
    } catch (error) {
      console.error(error);
    }
  }

  const FormControlFactory = (props: {
    label: string;
    id?: string;
    placeholder?: string;
    type?: string;
  }) => {
    const { label = "label", id, placeholder, type } = props;
    return (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input
          type={type}
          id={id}
          placeholder={placeholder}
          {...(id && register(id))}
        />
      </FormControl>
    );
  };

  const handleGenerateApiKey = async () => {
    try {
      const res = await fetch(`/api/users/api-key`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${session.jwt}`,
        },
      });
      const { apiKey } = await res.json();
      logger.debug(
        "settings.tsx:handleGenerateApiKey:apiKey",
        apiKey,
      );
      reset({ apiKey });
      toast.success("API Key generated", { position: toastPosition });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProtectedComponent session={session}>
      <MainPageLayout>
        <Container p={10} maxW="container.md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={8}>
              <Heading size="xl">Account Settings</Heading>
              <Divider />
              <SectionContainer>
                <Heading size="md">Personal info</Heading>
                <Stack w={["100%", "50%"]} spacing={5}>
                  <FormControlFactory
                    label="name"
                    id="name"
                    placeholder="John Doe"
                  />
                  <FormControlFactory label="Email" id="email" />
                </Stack>
              </SectionContainer>
              <Divider />
              <SectionContainer>
                <Heading size="md">Authentication</Heading>
                <Stack w={["100%", "50%"]} spacing={5}>
                  <FormControl>
                    <HStack justify="space-between">
                      <FormLabel>New password</FormLabel>
                      <Button
                        variant={"ghost"}
                        _hover={{ bg: "transparent" }}
                        _active={{ bg: "transparent" }}
                        onClick={() =>
                          setShowPassword(
                            (showPassword) => !showPassword,
                          )
                        }
                      >
                        {showPassword ? (
                          <ViewIcon />
                        ) : (
                          <ViewOffIcon />
                        )}
                      </Button>
                    </HStack>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="new_password"
                      {...register("new_password")}
                    />
                  </FormControl>
                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Confirm password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        borderColor={errors.password && "red.300"}
                        focusBorderColor={
                          errors.password && "red.300"
                        }
                        id="password"
                        {...register("password", {
                          minLength: 1,
                          validate: (value) => {
                            logger.debug(
                              "settings.tsx:validate:password",
                              getValues("password"),
                              "settings.tsx:validate:new_password",
                              getValues("new_password"),
                            );
                            return (
                              (!value &&
                                !getValues("new_password")) ||
                              value === getValues("new_password") ||
                              "Passwords must match"
                            );
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.password?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </SectionContainer>
              <Divider />
              <SectionContainer>
                <Heading size="md">Rest API</Heading>
                <Stack w={["100%", "50%"]} spacing={5}>
                  <FormControl>
                    <HStack justify="space-between">
                      <FormLabel>API Key</FormLabel>
                      <Button
                        variant={"ghost"}
                        _hover={{ bg: "transparent" }}
                        _active={{ bg: "transparent" }}
                        onClick={() =>
                          setShowApiKey((showApiKey) => !showApiKey)
                        }
                      >
                        {showApiKey ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </HStack>
                    <Input
                      type={showApiKey ? "text" : "password"}
                      {...register("apiKey")}
                    />
                  </FormControl>
                  <HStack justify="end">
                    <Button
                      onClick={handleGenerateApiKey}
                      variant="ghost"
                      leftIcon={<IoMdRefresh />}
                    >
                      Generate API Key
                    </Button>
                    <Button
                      leftIcon={
                        !hasCopied ? (
                          <BiCopy />
                        ) : (
                          <AiFillCheckCircle />
                        )
                      }
                      onClick={onCopy}
                      variant="outline"
                      colorScheme={hasCopied && "green"}
                    >
                      {!hasCopied ? "Copy" : "Copied"}
                    </Button>
                  </HStack>
                </Stack>
              </SectionContainer>
              <HStack mt={"60px !important"} justify="end">
                <Button
                  colorScheme="gray"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Saving..."
                >
                  Save Changes
                </Button>
              </HStack>
            </Stack>
          </form>
        </Container>
      </MainPageLayout>
    </ProtectedComponent>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  logger.debug("settings:session", session);
  // if no session found(user hasn’t logged in)
  if (!session) {
    return {
      redirect: {
        destination: `/auth/signin?callbackUrl=${ctx.resolvedUrl}`, //redirect user to homepage
        permanent: false,
      },
    };
  }
  return { props: { session } };
}

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Button,
  Collapse,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { logger } from "@lib/logger";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLockAlt } from "react-icons/bi";

export const AuthCredentials = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { isOpen, onOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  let defaultBody = {
    grant_type: "",
    username: "asdf@gmail.com",
    password: "asdf",
    scope: "",
    client_id: "",
    client_secret: "",
  };

  async function onSubmit(values) {
    try {
      const body = { ...defaultBody, ...values };
      console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
      let res = await signIn("credentials", {
        ...body,
        callbackUrl: router.query.callbackUrl,
      });
      logger.debug(`signing:onsubmit:res`, res);
    } catch (error) {
      logger.error(error);
    }
  }

  return (
    <>
      <Button w="full" leftIcon={<BiLockAlt />} onClick={onToggle}>
        User & password
      </Button>
      <Collapse in={isOpen} style={{ width: "100%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} pt={10}>
            <FormControl
              id="email"
              isInvalid={Boolean(router.query.error)}
              isRequired
            >
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register("username")} />
            </FormControl>
            <FormControl
              id="password"
              isRequired
              isInvalid={Boolean(router.query.error)}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {router.query.error &&
                router.query.error === "CredentialsSignin" && (
                  <FormErrorMessage>
                    Invalid credentials
                  </FormErrorMessage>
                )}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                isLoading={isSubmitting}
                loadingText="Signing in..."
                bg={"blue.400"}
                color={"white"}
                type="submit"
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Not a user yet?{" "}
                <Link
                  color={"blue.400"}
                  href={`/auth/signup${
                    router.query.callbackUrl
                      ? `?callbackUrl=${router.query.callbackUrl}`
                      : ""
                  }`}
                >
                  Register
                </Link>
              </Text>
            </Stack>
          </Stack>
        </form>
      </Collapse>
    </>
  );
};

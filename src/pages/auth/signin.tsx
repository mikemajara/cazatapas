import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { AuthForm } from "@components/auth/auth-form";

//icons

export default function SignInPage() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        minW="md"
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <AuthForm />
      </Box>
    </Flex>
  );
}

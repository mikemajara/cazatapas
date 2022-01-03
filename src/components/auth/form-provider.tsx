import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import router from "next/router";
import React from "react";

export const FormProvider = (props) => {
  const { provider, callbackUrl, icon, label } = props;
  return (
    <Button
      w="full"
      leftIcon={icon}
      onClick={() =>
        signIn(provider, {
          callbackUrl,
        })
      }
    >
      {label}
    </Button>
  );
};

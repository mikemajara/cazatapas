import React from "react";
import { Button, Heading, Text, Stack } from "@chakra-ui/react";
import { RatingComponent } from "@components/rating-component";
import { useDishRating, useSaveRating } from "@hooks/hooks-dishes";
import { logger } from "@lib/logger";
import { useSession } from "next-auth/react";
import { NextLink, ChakraLink } from "@lib/utils";
import { useRouter } from "next/router";
import { IoIosLogIn } from "react-icons/io";
import { LoginButton } from "@components/auth/login-button";

export const RatingDishComponent = (props) => {
  const { dishId } = props;
  const { status } = useSession();
  const router = useRouter();
  const { data: ratingData } = useDishRating(dishId);
  const mutationRating = useSaveRating(dishId);

  const onSaveRating = (value) => {
    mutationRating.mutate({ rating: value });
  };

  return (
    <Stack>
      <Heading fontWeight="light" size="lg">
        Your rating
      </Heading>
      {status === "unauthenticated" ? (
        <LoginButton justify="start" children="Log in to rate" />
      ) : status === "authenticated" ? (
        <RatingComponent
          color="orange.300"
          isEditable
          rating={ratingData?.value}
          onClick={onSaveRating}
        />
      ) : (
        "Loading..."
      )}
    </Stack>
  );
};

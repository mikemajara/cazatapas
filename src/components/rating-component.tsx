import { HStack } from "@chakra-ui/react";
import { Star } from "phosphor-react";
import React from "react";

export const RatingComponent = (props) => {
  const { rating } = props;
  const starCount = Math.round(rating);
  const starSize = 22;
  return (
    <HStack>
      {Array(starCount)
        .fill(0)
        .map((e) => (
          <Star size={starSize} weight="fill" />
        ))}
      {Array(5 - starCount)
        .fill(0)
        .map((e) => (
          <Star size={starSize} />
        ))}
    </HStack>
  );
};

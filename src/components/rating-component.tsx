import { Button, HStack } from "@chakra-ui/react";
import { Star } from "phosphor-react";
import React, { useEffect, useState } from "react";

export const RatingComponent = (props) => {
  const [value, setValue] = useState(0);
  const { rating = 0, isEditable = false } = props;
  const starCount = Math.round(rating);
  useEffect(() => {
    if (starCount) {
      setValue(starCount);
    }
  }, [rating]);
  const starSize = 22;
  const starArray = Array(value)
    .fill(1)
    .concat(Array(5 - value).fill(0));
  return (
    <HStack>
      <HStack>
        {starArray.map((e, i) => (
          <Star
            size={starSize}
            weight={e ? "fill" : "regular"}
            key={i}
            onClick={() => {
              setValue(i + 1);
            }}
            cursor="pointer"
          />
        ))}
      </HStack>
      {isEditable && (
        <Button size="xs" onClick={() => setValue(0)}>
          Clear
        </Button>
      )}
    </HStack>
  );
};

import React from "react";
import {
  Image,
  Text,
  Box,
  Link as ChakraLink,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { RatingComponent } from "@components/rating-component";
import NextLink from "next/link";
import { Dish, DishInclude } from "prisma/model";
import _ from "lodash";
import { logger } from "@lib/logger";
import { imageLocations } from "@lib/constants";

export const DishCard = (props: any) => {
  const { id, name, ratings, tags, images } = props;
  const averageRating = _.mean(ratings?.map((r) => r.value));

  return (
    <Box w="220" h="300">
      <VStack align={"flex-start"}>
        <NextLink href={`/dishes/${id}`} passHref>
          <ChakraLink
            as={Image}
            boxSize={220}
            fit={"cover"}
            src={`${imageLocations.dishes}/${images?.[0]?.fileName}`}
            borderRadius={"md"}
            border=".25px solid"
            borderColor="gray.900"
            boxShadow="4px 4px 0px #000000"
          />
        </NextLink>
        <Text maxW="200" fontWeight={"bold"}>
          {name}
        </Text>
        <RatingComponent rating={averageRating} />
      </VStack>
    </Box>
  );
};

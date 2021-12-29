import React from "react";
import { Hash, Star } from "phosphor-react";
import {
  Image,
  Text,
  Box,
  HStack,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import humanNumber from "human-number";
import { humanize } from "@lib/rounding";
import _ from "lodash";
import next from "next";
import { RestaurantInclude } from "prisma/model";

const IMAGE_LOCATION = "/images";

export const RestaurantCard = (props: RestaurantInclude) => {
  const { id, name, dishes, images } = props;
  const ratingCount = dishes.reduce(
    (e, f) => e + f.ratings.length,
    0,
  );
  const totalRating = dishes.reduce(
    (e, f) => e + f.ratings.reduce((v, r) => v + r.value, 0),
    0,
  );
  const averageRating =
    Math.round((totalRating / ratingCount) * 100) / 100 || 0;

  return (
    <Box w="220" h="300">
      <VStack align={"flex-start"}>
        <NextLink href="restaurants/4" passHref>
          <ChakraLink
            as={Image}
            boxSize={220}
            fit={"cover"}
            src={`${IMAGE_LOCATION}${images?.[0].fileName}`}
            borderRadius={"md"}
            border=".25px solid"
            borderColor="gray.900"
            boxShadow="4px 4px 0px #000000"
          />
        </NextLink>
        <Text fontWeight={"bold"}>{name}</Text>
        <HStack>
          <HStack>
            <Hash /> <Text>{humanize(ratingCount)}</Text>
          </HStack>
          <HStack>
            <Star />
            <Text>{averageRating}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

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

const IMAGE_LOCATION = "/images";

const mock = {
  id: 4,
  name: "Restaurante las anas",
  votes: 100400,
  rating: 3.2,
  tags: ["vegan", "vegetarian", "gluten-free"],
  images: ["los-navarros.png", "las-anas.png"],
};

export const RestaurantCard = () => {
  const { id, name, rating, tags, images, votes } = mock;
  return (
    <Box w="220" h="300">
      <VStack align={"flex-start"}>
        <NextLink href="restaurants/4" passHref>
          <ChakraLink
            as={Image}
            boxSize={220}
            fit={"cover"}
            src={`${IMAGE_LOCATION}/${_.sample(images)}`}
            borderRadius={"md"}
            boxShadow="4px 4px 0px #000000"
          />
        </NextLink>
        <Text fontWeight={"bold"}>{name}</Text>
        <HStack>
          <HStack>
            <Hash /> <Text>{humanize(votes)}</Text>
          </HStack>
          <HStack>
            <Star />
            <Text>{rating}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

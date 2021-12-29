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

const IMAGE_LOCATION = "/images/dishes";

const mock = {
  id: 4,
  name: "Tortilla de patatas",
  rating: 3.2,
  tags: ["vegan", "vegetarian", "gluten-free"],
  image: "tortilla-patatas.jpg",
};

export const DishCard = (props: DishInclude) => {
  const { id, name, ratings, tags, images } = props;
  const averageRating = _.mean(ratings?.map((r) => r.value));
  return (
    <Box w="220" h="300">
      <VStack align={"flex-start"}>
        <NextLink href="dishes/4" passHref>
          <ChakraLink
            as={Image}
            boxSize={220}
            fit={"cover"}
            src={`${IMAGE_LOCATION}/${images?.[0]?.location}`}
            borderRadius={"md"}
            boxShadow="4px 4px 0px #000000"
          />
        </NextLink>
        <Text fontWeight={"bold"}>{name}</Text>
        <RatingComponent rating={averageRating} />
      </VStack>
    </Box>
  );
};

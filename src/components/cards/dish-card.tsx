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

const IMAGE_LOCATION = "/images";

const mock = {
  id: 4,
  name: "Tortilla de patatas",
  rating: 3.2,
  tags: ["vegan", "vegetarian", "gluten-free"],
  image: "tortilla-patatas.jpg",
};

export const DishCard = () => {
  const { id, name, rating, tags, image } = mock;
  return (
    <Box w="220" h="300">
      <VStack align={"flex-start"}>
        <NextLink href="dishes/4" passHref>
          <ChakraLink
            as={Image}
            boxSize={220}
            fit={"cover"}
            src={`${IMAGE_LOCATION}/${image}`}
            borderRadius={"md"}
            boxShadow="4px 4px 0px #000000"
          />
        </NextLink>
        <Text fontWeight={"bold"}>{name}</Text>
        <RatingComponent rating={rating} />
      </VStack>
    </Box>
  );
};

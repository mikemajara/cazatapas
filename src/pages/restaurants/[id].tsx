import {
  Image,
  Container,
  Heading,
  Stack,
  Badge,
  Flex,
  HStack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { DishCard } from "@components/cards/dish-card";
import { Layout } from "@components/layout";
import { RatingComponent } from "@components/rating-component";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";

const IMAGE_LOCATION = "/images";
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];
const mock = {
  id: 4,
  name: "Restaurante las anas",
  votes: 100400,
  rating: 3.2,
  tags: ["vegan", "vegetarian", "gluten-free"],
  images: ["los-navarros.png", "las-anas.png"],
};

export default function Dish(props) {
  // const router = useRouter();
  // const { id } = router.query;
  const { id, name, rating, votes, tags, images } = mock;

  return (
    <Layout>
      <Image
        // boxSize={220}
        w="full"
        h="350"
        fit={"cover"}
        src={`${IMAGE_LOCATION}/${_.sample(images)}`}
      />
      <Container p={10} maxW="container.xl">
        <Stack spacing={10} justify={"center"}>
          <Heading size="xl" textAlign={"center"}>
            Restaurante las Anas.
          </Heading>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
            justifyItems="center"
            rowGap={20}
          >
            <DishCard />
            <DishCard />
            <DishCard />
            <DishCard />
            <DishCard />
            <DishCard />
            <DishCard />
            <DishCard />
          </SimpleGrid>
        </Stack>
      </Container>
    </Layout>
  );
}

import {
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { DishCard } from "@components/cards/dish-card";
import { RestaurantCard } from "@components/cards/restaurant-card";
import { Layout } from "@components/layout";
import React from "react";

export default function Dishes() {
  return (
    <Layout>
      <Container p={10} maxW="container.xl">
        <Stack spacing={10} justify={"center"}>
          <Heading size="xl">Restaurants.</Heading>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
            justifyItems="center"
            rowGap={20}
          >
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
          </SimpleGrid>
        </Stack>
      </Container>
    </Layout>
  );
}

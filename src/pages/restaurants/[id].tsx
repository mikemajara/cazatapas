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
  Button,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DishCard } from "@components/cards/dish-card";
import { Layout } from "@components/layout";
import { RatingComponent } from "@components/rating-component";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";
import {
  useAllDishes,
  useRestaurantDishes,
} from "@hooks/hooks-dishes";
import { useRestaurant } from "@hooks/hooks-restaurants";
import { AddIcon } from "@chakra-ui/icons";
import { ModalAddDish } from "@components/modals/add-dish";

const IMAGE_LOCATION = "/images/restaurants";
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
  const router = useRouter();
  const { id } = router.query;
  const { data: restaurant, isLoading, error } = useRestaurant(id);
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const IconComponent = isMobile ? IconButton : Button;
  // const { id, name, rating, votes, tags, images } = mock;

  return (
    <Layout>
      <Image
        // boxSize={220}
        w="full"
        h="350"
        fit={"cover"}
        src={`${IMAGE_LOCATION}/${restaurant?.images?.[0]?.fileName}`}
      />
      <Container p={10} maxW="container.xl">
        <Stack spacing={10} justify={"center"}>
          <Heading size="xl" textAlign={"center"}>
            {isLoading
              ? "Asking for restaurant's name"
              : restaurant.name}
            .
          </Heading>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
            justifyItems="center"
            rowGap={20}
          >
            {isLoading
              ? "Peeping into the kitchen..."
              : restaurant?.dishes.map((e) => <DishCard {...e} />)}
          </SimpleGrid>
          <ModalAddDish
            button={
              <IconComponent
                aria-label="add"
                position="fixed"
                bottom={["44"]}
                right={["5", "10"]}
                variant="outline"
                border="1px solid"
                borderColor="black"
                icon={isMobile && <AddIcon fontSize="xs" />}
                leftIcon={!isMobile && <AddIcon fontSize="xs" />}
                style={{ boxShadow: "4px 4px 0px #000000" }}
                children={!isMobile && "Add dish"}
              />
            }
          />
        </Stack>
      </Container>
    </Layout>
  );
}

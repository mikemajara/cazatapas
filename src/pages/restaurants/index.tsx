import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DishCard } from "@components/cards/dish-card";
import { RestaurantCard } from "@components/cards/restaurant-card";
import { Layout } from "@components/layout";
import { ModalAddRestaurant } from "@components/modals/add-restaurant";
import React from "react";
import { useAllRestaurants } from "src/hooks/useAllRestaurants";

export default function Dishes() {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const IconComponent = isMobile ? IconButton : Button;
  const { data: restaurants, isLoading, error } = useAllRestaurants();

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
            {isLoading
              ? "Loading..."
              : restaurants.map((e) => <RestaurantCard {...e} />)}
          </SimpleGrid>
          <ModalAddRestaurant
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
                children={!isMobile && "Add restaurant"}
              />
            }
          />
        </Stack>
      </Container>
    </Layout>
  );
}

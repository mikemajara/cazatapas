import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DishCard } from "@components/cards/dish-card";
import { RestaurantCard } from "@components/cards/restaurant-card";
import { Layout } from "@components/layout";
import { ModalAddRestaurant } from "@components/modals/add-restaurant";
import React, { useState } from "react";
import { useAllRestaurants } from "@hooks/hooks-restaurants";
import { MagnifyingGlass } from "phosphor-react";
import { useRouter } from "next/router";

export default function Dishes() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const buttonExpanded = useBreakpointValue({
    base: true,
    md: false,
  });
  const IconComponent = buttonExpanded ? IconButton : Button;
  const {
    data: restaurants,
    isLoading,
    error,
  } = useAllRestaurants({ search });

  return (
    <Layout>
      <Container p={10} maxW="container.xl">
        <Stack spacing={10} justify={"center"}>
          <Stack
            direction={["column", "row"]}
            justify="space-between"
            align="center"
          >
            <Heading size="xl">Restaurants.</Heading>
            <InputGroup size="md" maxW="sm">
              <Input
                pr="4.5rem"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search restaurant"
              />
              <InputRightElement width="4.5rem" zIndex={0}>
                <MagnifyingGlass />
              </InputRightElement>
            </InputGroup>
          </Stack>
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
            isOpen={Boolean(router.query.addRestaurant)}
            button={
              <IconComponent
                bg="white"
                aria-label="add"
                position="fixed"
                bottom={{ base: 10, md: 40 }}
                right={["5", "10"]}
                variant="outline"
                border="1px solid"
                borderColor="black"
                icon={buttonExpanded && <AddIcon fontSize="xs" />}
                leftIcon={
                  !buttonExpanded && <AddIcon fontSize="xs" />
                }
                style={{ boxShadow: "4px 4px 0px #000000" }}
                children={!buttonExpanded && "Add restaurant"}
              />
            }
          />
        </Stack>
      </Container>
    </Layout>
  );
}

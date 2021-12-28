import {
  Button,
  Container,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { DishCard } from "@components/cards/dish-card";
import { Layout } from "@components/layout";
import { MagnifyingGlass } from "phosphor-react";
import React from "react";

export default function Dishes() {
  return (
    <Layout>
      <Container p={10} maxW="container.xl">
        <Stack spacing={10} justify={"center"}>
          <Stack
            direction={["column", "row"]}
            justify="space-between"
            align="center"
          >
            <Heading size="xl">Dishes.</Heading>
            <InputGroup size="md" maxW="sm">
              <Input pr="4.5rem" placeholder="Search dish" />
              <InputRightElement width="4.5rem">
                <MagnifyingGlass />
              </InputRightElement>
            </InputGroup>
          </Stack>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
            justifyItems="center"
            rowGap={10}
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

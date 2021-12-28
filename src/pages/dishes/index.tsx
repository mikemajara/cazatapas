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
  useBreakpoint,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DishCard } from "@components/cards/dish-card";
import { Layout } from "@components/layout";
import { ModalAddDish } from "@components/modals/add-dish";
import { MagnifyingGlass } from "phosphor-react";
import React from "react";

export default function Dishes() {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const IconComponent = isMobile ? IconButton : Button;
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

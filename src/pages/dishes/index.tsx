import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Code,
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
import { logger } from "@lib/logger";
import { MagnifyingGlass } from "phosphor-react";
import React, { useState } from "react";
import { useAllDishes } from "@hooks/hooks-dishes";
import { DishInclude } from "prisma/model";
import { Router, useRouter } from "next/router";

export default function Dishes() {
  const [search, setSearch] = useState("");
  const buttonExpanded = useBreakpointValue({
    base: false,
    md: true,
  });
  const IconComponent = buttonExpanded ? Button : IconButton;
  const router = useRouter();
  const { data: dishes, isLoading, error } = useAllDishes({ search });

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
              <Input
                pr="4.5rem"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dish"
              />
              <InputRightElement width="4.5rem" zIndex={0}>
                <MagnifyingGlass />
              </InputRightElement>
            </InputGroup>
          </Stack>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
            justifyItems="center"
            rowGap={10}
          >
            {isLoading
              ? "Loading..."
              : dishes.map((e) => <DishCard {...e} />)}
          </SimpleGrid>
          <ModalAddDish
            isOpen={Boolean(router.query.addDish)}
            button={
              <IconComponent
                aria-label="add"
                bg={"white"}
                position="fixed"
                bottom={buttonExpanded ? 40 : 10}
                right={["5", "10"]}
                variant="outline"
                border="1px solid"
                borderColor="black"
                icon={!buttonExpanded && <AddIcon fontSize="xs" />}
                leftIcon={buttonExpanded && <AddIcon fontSize="xs" />}
                style={{ boxShadow: "4px 4px 0px #000000" }}
                children={buttonExpanded && "Add dish"}
              />
            }
          />
        </Stack>
      </Container>
    </Layout>
  );
}

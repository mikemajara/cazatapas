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

  const isMobile = useBreakpointValue({ base: true, sm: false });
  const IconComponent = isMobile ? IconButton : Button;
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
            {isLoading
              ? "Loading..."
              : dishes.map((e) => <DishCard {...e} />)}
          </SimpleGrid>
          <ModalAddDish
            isOpen={Boolean(router.query.addDish)}
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

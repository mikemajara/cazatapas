import {
  chakra,
  Container,
  Text,
  Link as ChakraLink,
  Code,
  List,
  ListIcon,
  ListItem,
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  LinkIcon,
  PhoneIcon,
  SearchIcon,
} from "@chakra-ui/icons";

import { Hero } from "../components/hero";
import { Main } from "../components/main";
import { DarkModeSwitch } from "../components/dark-mode-switch";
import { CTA } from "../components/cta";
import React, { useEffect, useState } from "react";
import { MainPageLayout } from "../components/layout";
import { CategoryCard } from "../components/cards/category-card";
import { TagCard } from "../components/cards/tag-card";
import ProductAddToCart from "../components/cards/offer-card";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const toggleSelectedCategories = (category: string) => {
    if (categories.includes(category)) {
      setCategories([...categories.filter((e) => e !== category)]);
    } else {
      setCategories([...categories, category]);
    }
  };

  const toggleSelectedTags = (tag: string) => {
    if (tags.includes(tag)) {
      setTags([...tags.filter((e) => e !== tag)]);
    } else {
      setTags([...tags, tag]);
    }
  };

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <MainPageLayout>
      <Container my={10} maxW="container.lg">
        <Stack>
          <Container maxW="container.md">
            <Stack>
              <InputGroup>
                <InputRightElement
                  pointerEvents="none"
                  zIndex={0}
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  placeholder="Category | Tag | Product name"
                  borderRadius="full"
                />
              </InputGroup>
              <HStack id="categories">
                {["Clothes", "Technology", "Food", "Books"].map(
                  (category) => (
                    <Box
                      onClick={() =>
                        toggleSelectedCategories(category)
                      }
                      cursor="pointer"
                    >
                      <CategoryCard
                        label={category}
                        isSelected={categories.includes(category)}
                      />
                    </Box>
                  ),
                )}
              </HStack>
              <HStack id="tags">
                {["umbrellas", "tablets", "burgers", "politics"].map(
                  (tag) => (
                    <Box
                      onClick={() => toggleSelectedTags(tag)}
                      cursor="pointer"
                    >
                      <TagCard
                        label={tag}
                        isSelected={tags.includes(tag)}
                      />
                    </Box>
                  ),
                )}
              </HStack>
            </Stack>
          </Container>
          <Grid id="articles" pt={16}>
            <Grid
              w="full"
              h="full"
              gridTemplateColumns="repeat(auto-fit, minmax(150px,1fr))"
              columnGap="15px"
              rowGap="15px"
            >
              {Array(9)
                .fill(0)
                .map((e) => (
                  <Box
                    p={3}
                    boxSize="150px"
                    border="1px solid"
                    borderColor="gray.300"
                    align="center"
                    borderRadius="xl"
                  >
                    Product
                  </Box>
                ))}
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </MainPageLayout>
  );
};

export default Index;

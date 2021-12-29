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
  Heading,
  Image,
  useBreakpoint,
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
import { Layout } from "../components/layout";
import { CategoryCard } from "../components/cards/category-card";
import { TagCard } from "../components/cards/tag-card";
import ProductAddToCart from "../components/cards/offer-card";
import { BsShop } from "react-icons/bs";
import { RiRestaurant2Fill } from "react-icons/ri";
import { Star } from "phosphor-react";
import { navbarHeight } from "@components/layout/navbar";
import {
  footerHeight,
  footerHeightBase,
} from "@components/layout/footer";
import { ModalAddDish } from "@components/modals/add-dish";
import { SelectAsyncRestaurant } from "@components/select/async-select-restaurant";
import { AiOutlineShop } from "react-icons/ai";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const isDesktop = useBreakpoint("sm");
  const navbarAndFooterHeight =
    navbarHeight + (isDesktop ? footerHeight : footerHeightBase);
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
    <Layout>
      <Stack
        direction={["column", "row-reverse"]}
        justify="space-between"
        style={{
          minHeight: `calc(100vh - ${navbarAndFooterHeight}px)`,
        }}
      >
        <Image
          w={["100%", "50%"]}
          fit={"cover"}
          src={`images/tortilla-patatas.jpg`}
        />
        <Stack spacing={20} p={10} w={["100%", "50%"]}>
          <Stack>
            <Heading fontSize="6xl">Hunting for</Heading>
            <Heading
              bgGradient="linear(to-b, orange.300, red.300)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              the best dishes
            </Heading>
            <Heading fontSize="6xl">out there</Heading>
          </Stack>
          <Stack direction={["column", "row"]} spacing={10}>
            <SelectAsyncRestaurant
              placeholder={
                <HStack>
                  <AiOutlineShop />
                  <Text>Search Restaurant</Text>
                </HStack>
              }
            />
            <InputGroup maxW={330}>
              <Input placeholder="Dish" />
              <InputLeftElement
                pointerEvents="none"
                color="gray.400"
                children={<RiRestaurant2Fill />}
              />
            </InputGroup>
          </Stack>
          <Box>
            <ModalAddDish
              button={
                <Button
                  colorScheme="orange"
                  size="md"
                  leftIcon={<Star />}
                >
                  Rate a dish!
                </Button>
              }
            />
          </Box>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Index;

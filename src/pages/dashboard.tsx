import {
  Box,
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Grid,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Hero } from "../components/hero";
import { Main } from "../components/main";
import { DarkModeSwitch } from "../components/dark-mode-switch";
import { CTA } from "../components/cta";
import React from "react";
import { Layout } from "../components/layout";
import CardWithIllustration from "./subscribe";
import ProductAddToCart from "../components/cards/offer-card";
import { getSession } from "next-auth/react";
import { getSessionHandler } from "../../lib/get-session-handler";

const Index = (props: any) => (
  <Layout>
    <Grid
      w="full"
      h="full"
      gridTemplateColumns="repeat(auto-fit, minmax(300px,1fr))"
      rowGap="150px"
    >
      {Array(9)
        .fill(0)
        .map((e) => (
          <Box boxSize="300px">
            <ProductAddToCart></ProductAddToCart>
          </Box>
        ))}
    </Grid>
  </Layout>
);

export default Index;

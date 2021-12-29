import {
  Image,
  Container,
  Heading,
  Stack,
  Badge,
  Flex,
  HStack,
  Text,
  useBreakpoint,
  Box,
} from "@chakra-ui/react";
import { Layout } from "@components/layout";
import {
  footerHeight,
  footerHeightBase,
} from "@components/layout/footer";
import { navbarHeight } from "@components/layout/navbar";
import { RatingComponent } from "@components/rating-component";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";

const IMAGE_LOCATION = "/images";
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
  name: "Tortilla de patatas",
  rating: 3.2,
  votes: 10000,
  tags: ["vegan", "vegetarian", "gluten-free"],
  image: "tortilla-patatas.jpg",
  opinions: [
    {
      user: "comitre",
      comment:
        "Proident anim esse duis. Esse aliquip culpa exercitation veniam consectetur velit laboris. Do ut ex in aute magna exercitation. Excepteur labore proident adipiscing laborum commodo duis amet.",
    },
    {
      user: "juanpalomo",
      comment:
        "Proident anim esse duis. Esse aliquip culpa exercitation veniam consectetur velit laboris. Do ut ex in aute magna exercitation. Excepteur labore proident adipiscing laborum commodo duis amet.",
    },
  ],
};

export default function Dish(props) {
  // const router = useRouter();
  // const { id } = router.query;
  const { id, name, rating, votes, tags, image, opinions } = mock;
  const isDesktop = useBreakpoint("sm");
  const navbarAndFooterHeight =
    navbarHeight + (isDesktop ? footerHeight : footerHeightBase);
  return (
    <Layout>
      <Container
        p={10}
        maxW="container.xl"
        style={{
          minHeight: `calc(100vh - ${navbarAndFooterHeight}px)`,
        }}
      >
        <Stack>
          <Heading>{name}</Heading>
          <Stack direction={["column", "row"]} spacing={10}>
            <Stack w="full" spacing={10}>
              {/* image-and-rating */}
              <Stack direction={["column", "row"]} spacing={10}>
                <Image
                  boxSize={320}
                  fit={"cover"}
                  src={`${IMAGE_LOCATION}/${image}`}
                  borderRadius={"md"}
                  boxShadow="4px 4px 0px #000000"
                />
                <Stack>
                  <Stack>
                    <Heading>Rating</Heading>
                    <RatingComponent rating={rating} />
                  </Stack>
                  <Stack>
                    <Heading># of votes</Heading>
                    <Heading size="lg">{votes}</Heading>
                  </Stack>
                  <Stack>
                    <Heading>Tags</Heading>
                    <Flex flexWrap="wrap" maxW="52">
                      {tags.map((e) => (
                        <Badge
                          mr={2}
                          mt={2}
                          colorScheme={_.sample(colors)}
                        >
                          #{e}
                        </Badge>
                      ))}
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Stack id="your-rating">
                <Heading fontWeight="light" size="lg">
                  Your rating
                </Heading>
                <RatingComponent color="orange.300" isEditable />
              </Stack>
              <Stack id="your-comments">
                <Heading fontWeight="light" size="lg">
                  Your comments
                </Heading>
                <Box position="relative">
                  <Text
                    maxH="170"
                    pb={10}
                    overflowY="scroll"
                    _before={{
                      content: `""`,
                      position: "absolute",
                      // position: "relative",
                      // w: "100px",
                      // h: "100px",
                      w: "100%",
                      h: "100%",
                      backgroundImage:
                        "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,97,255,0) 19%);",
                    }}
                  >
                    Ut magna anim aute ipsum. Labore velit tempor nisi
                    dolor, lorem pariatur nulla excepteur. Sint do
                    adipiscing commodo enim, officia sed deserunt
                    cupidatat veniam et adipiscing laboris. Cupidatat
                    amet laboris occaecat dolore. Mollit elit occaecat
                    cupidatat deserunt. Laboris dolore reprehenderit
                    aliquip commodo, velit nisi non ex mollit aute.
                    Aute labore quis dolor. Esse fugiat reprehenderit
                    officia ut ex lorem. Consequat enim id sint dolor
                    quis ad. Sit incididunt veniam dolore aute anim
                    aute. Dolore ut exercitation commodo eiusmod minim
                    occaecat excepteur. Magna velit eu laborum culpa
                    do, sed incididunt reprehenderit nostrud id est.
                    Fugiat nulla pariatur in. Cillum laboris ex
                    pariatur occaecat ea sunt culpa, cillum culpa ex
                    minim laborum ipsum sed elit.
                  </Text>
                </Box>
              </Stack>
            </Stack>
            <Stack>
              <Heading>Comments</Heading>
              {opinions.map(({ user, comment }) => (
                <Stack>
                  <Heading size="md">{user}</Heading>
                  <Text>{comment}</Text>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Layout>
  );
}

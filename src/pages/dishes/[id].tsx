import {
  Image,
  Container,
  Heading,
  Stack,
  Badge,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Layout } from "@components/layout";
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

  return (
    <Layout>
      <Container p={10} maxW="container.xl">
        <Stack>
          <Heading>{name}</Heading>
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

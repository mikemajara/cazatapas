import React, { useState } from "react";
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
  Link as ChakraLink,
  Avatar,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { Layout } from "@components/layout";
import {
  footerHeight,
  footerHeightBase,
} from "@components/layout/footer";
import { navbarHeight } from "@components/layout/navbar";
import { RatingComponent } from "@components/rating-component";
import {
  useDish,
  useSaveComment,
  useSaveRating,
} from "@hooks/hooks-dishes";
import { logger } from "@lib/logger";
import _ from "lodash";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Tag } from "@components/tag";
import { format } from "date-fns";
import { FloppyDisk } from "phosphor-react";
import { useForm } from "react-hook-form";
import ky from "ky";
import { useMutation } from "react-query";

const IMAGE_LOCATION = "/images/dishes";
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
  const isDesktop = useBreakpoint("sm");
  const router = useRouter();
  const { id } = router.query;
  logger.debug(
    `dishes/[id].tsx:Dish:router.query.id`,
    router.query.id,
  );

  const [isEditingComment, setIsEditingComment] = useState(false);
  const { data: dish, isLoading, error } = useDish(id);

  // const mutationComment = useSaveComment(id, (value) => {
  //   reset({ comment: value });
  // });

  const navbarAndFooterHeight =
    navbarHeight + (isDesktop ? footerHeight : footerHeightBase);

  const ratingCount = dish?.ratings.length;
  const totalRating = dish?.ratings.reduce((e, r) => e + r.value, 0);
  const averageRating =
    Math.round((totalRating / ratingCount) * 100) / 100 || 0;

  const EditCommentComponent = isEditingComment ? Textarea : Text;

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { comment: "hola" },
  });

  const mutationComment = useMutation(
    async (json) => {
      logger.debug(
        `dishes/[id].tsx:Dish:mutationComment:values`,
        json,
      );
      const res = await ky
        .post(`/api/dishes/comment?id=${id}`, {
          json,
        })
        .json();
      logger.debug(`dishes/[id].tsx:Dish:mutationComment:res`, res);
      return res;
    },
    {
      onSuccess: (value) => {
        logger.debug(
          `dishes/[id].tsx:Dish:mutationComment:onSuccess:value`,
          value,
        );
        reset({ comment: value as string });
      },
    },
  );

  const handleEditComment = () => {
    setIsEditingComment(!isEditingComment);
  };

  const onSaveComment = (values) => {
    logger.debug("dishes/[id].tsx: onSaveComment: values", values);
    mutationComment.mutate(values);
  };

  return (
    <Layout>
      <Container
        p={10}
        maxW="container.xl"
        style={{
          minHeight: `calc(100vh - ${navbarAndFooterHeight}px)`,
        }}
      >
        <Stack spacing={10}>
          <HStack justify="space-between">
            <Heading>{dish?.name}</Heading>
            <NextLink
              href={`/restaurants/${dish?.restaurant.id}`}
              passHref
            >
              <ChakraLink target="_blank" fontSize="lg">
                <HStack>
                  <Text>{dish?.restaurant.name}</Text>
                  <ExternalLinkIcon />
                </HStack>
              </ChakraLink>
            </NextLink>
          </HStack>
          <Stack direction={["column", "row"]} spacing={10}>
            <Stack w="full" spacing={10} maxW={["100%", "50%"]}>
              {/* image-and-rating */}
              <Stack direction={["column", "row"]} spacing={10}>
                <Image
                  boxSize={320}
                  fit={"cover"}
                  src={`${IMAGE_LOCATION}/${dish?.images?.[0]?.fileName}`}
                  borderRadius={"md"}
                  boxShadow="4px 4px 0px #000000"
                />
                <Stack>
                  <Stack>
                    <Heading fontWeight={"light"} size="lg">
                      Rating
                    </Heading>
                    <RatingComponent rating={averageRating} />
                  </Stack>
                  <Stack>
                    <Heading fontWeight={"light"} size="lg">
                      # of votes
                    </Heading>
                    <Heading size="lg">{ratingCount}</Heading>
                  </Stack>
                  <Stack>
                    <Heading fontWeight={"light"} size="lg">
                      Tags
                    </Heading>
                    <Flex flexWrap="wrap" maxW="52">
                      {dish?.tags?.map((e) => (
                        <Box mr={2} mt={2}>
                          <Tag {...e} />
                        </Box>
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
                <form onSubmit={handleSubmit(onSaveComment)}>
                  <HStack justify="space-between">
                    <Heading fontWeight="light" size="lg">
                      Your comments
                    </Heading>
                    <IconButton
                      aria-label="edit-comment"
                      onClick={handleEditComment}
                      type="submit"
                      icon={
                        isEditingComment ? (
                          <FloppyDisk />
                        ) : (
                          <EditIcon />
                        )
                      }
                    />
                  </HStack>
                  <Box position="relative">
                    <EditCommentComponent
                      minH={isEditingComment && "170px"}
                      maxH="170"
                      pb={10}
                      overflowY="scroll"
                      _before={{
                        content: `""`,
                        position: "absolute",
                        w: "100%",
                        h: "100%",
                        backgroundImage:
                          "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,97,255,0) 19%);",
                      }}
                      children={getValues("comment")}
                      {...register("comment")}
                    />
                  </Box>
                </form>
              </Stack>
            </Stack>
            <Stack>
              <Heading>Comments</Heading>
              {dish?.comments.map(({ user, text, updatedAt }) => {
                // logger.debug(`dishes/[${id}].tsx:user`, user);
                return (
                  <Stack>
                    <HStack justify="space-between">
                      <Heading fontWeight="light" size="md">
                        @{user.username}
                      </Heading>
                      <Text fontWeight="light">
                        {format(new Date(updatedAt), "PP")}
                      </Text>
                    </HStack>
                    <Text>{text}</Text>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Layout>
  );
}

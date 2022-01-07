import { EditIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import {
  Link as ChakraLink,
  HStack,
  Heading,
  IconButton,
  Box,
  Textarea,
  SkeletonText,
  Stack,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useDishComment, useSaveComment } from "@hooks/hooks-dishes";
import { useSession } from "next-auth/react";
import { FloppyDisk, X } from "phosphor-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { IoIosLogIn } from "react-icons/io";
import { useRouter } from "next/router";
import { LoginButton } from "@components/auth/login-button";

export const CommentDishComponent = (props) => {
  const { dishId } = props;
  const { status } = useSession();
  const router = useRouter();
  const [isEditingComment, setIsEditingComment] = useState(false);

  const { data, isLoading } = useDishComment(dishId);
  const mutationComment = useSaveComment(dishId);

  const { handleSubmit, register, reset, getValues, formState } =
    useForm({
      defaultValues: { comment: data?.text },
    });

  const toggleEditComment = () => {
    setIsEditingComment(!isEditingComment);
  };

  const onSaveComment = (values) => {
    mutationComment.mutate(values, {
      onSuccess: toggleEditComment,
    });
  };

  useHotkeys("cmd+enter", () => onSaveComment(getValues()), {
    enableOnTags: ["TEXTAREA"],
    enabled: isEditingComment,
  });

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSaveComment)}>
        <HStack justify="space-between" mb={5}>
          <Heading fontWeight="light" size="lg">
            Your comments
          </Heading>
          <HStack>
            <IconButton
              aria-label="edit-comment"
              type="submit"
              isLoading={mutationComment.isLoading}
              icon={isEditingComment ? <FloppyDisk /> : <EditIcon />}
            />
            {isEditingComment && (
              <IconButton
                aria-label="edit-comment"
                onClick={toggleEditComment}
                type="submit"
                icon={<X />}
              />
            )}
          </HStack>
        </HStack>
        <Box position="relative">
          {status === "unauthenticated" ? (
            <LoginButton
              justify="start"
              children="Log in to comment"
            />
          ) : isEditingComment ? (
            <Textarea
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
              children={data?.text}
              {...register("comment")}
            />
          ) : isLoading ? (
            <SkeletonText noOfLines={4} spacing="4" />
          ) : (
            <Text>{data?.text}</Text>
          )}
        </Box>
      </form>
    </Stack>
  );
};

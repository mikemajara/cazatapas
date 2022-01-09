import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Text,
  useDisclosure,
  HStack,
  Input,
  Stack,
  IconButton,
  Textarea,
  Flex,
  Icon,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { Camera, TagSimple } from "phosphor-react";
import { RatingComponent } from "@components/rating-component";
import { IoIosAdd } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { logger } from "@lib/logger";
import ImageThumbnailComponent from "@components/cards/image-thumbnail";
import { AiOutlineShop } from "react-icons/ai";
import { SelectAsyncRestaurantBasic } from "@components/select/async-select-restaurant-basic";
import { useForm } from "react-hook-form";
import ky from "ky";
import _ from "lodash";
import { SelectAsyncTags } from "@components/select/async-select-tags";
import { useRouter } from "next/router";
import { useShallowRouteChange } from "@hooks/use-shallow-route-change";
import { useSession } from "next-auth/react";
import { toast } from "@lib/toast";
import { MarkdownComponent } from "@components/markdown-component";
import DropzoneComponent from "@components/dropzone-component";

export const ModalAddDish = (props) => {
  const {
    isOpen,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [setKeyAddDish, unsetKeyAddDish] =
    useShallowRouteChange("addDish");

  const onOpen = () => setKeyAddDish(true, onOpenModal);
  const onClose = () => unsetKeyAddDish(onCloseModal);

  useEffect(() => {
    if (props.isOpen) {
      onOpenModal();
    }
  }, [props.isOpen]);

  const handleOnOpenModal = () => {
    if (status === "authenticated") {
      onOpen();
    } else {
      toast.warning(
        `[Log in](/auth/signin?callbackUrl=${router.asPath}) to add a dish.`,
      );
    }
  };

  // react-hook-form
  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [files, setFiles] = useState<File[]>([]);

  async function onSubmit(values) {
    logger.debug("onSubmit:values", values);
    let linkedImages = files.map((e) => ({ fileName: e.key }));
    try {
      await ky.post(`/api/dishes`, {
        json: {
          ..._.omit(values, [
            "restaurant",
            "comments",
            "dish",
            "tags",
            "rating",
          ]),
          restaurant: {
            connect: { id: values.restaurant.id },
          },
          ratings: {
            create: {
              value: values.rating,
              user: { connect: { email: session.user?.email } },
            },
          },
          comments: {
            create: {
              text: values.comment,
              user: { connect: { email: session.user?.email } },
            },
          },
          images: { create: linkedImages },
          tags: { connect: values.tags.map((e) => _.pick(e, "id")) },
        },
      });
      onClose();
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {React.cloneElement(props.button, {
        onClick: handleOnOpenModal,
      })}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        // isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add dish</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <FormControl>
                  <FormLabel htmlFor="restaurant">
                    Restaurant
                  </FormLabel>
                  <SelectAsyncRestaurantBasic
                    name="restaurant"
                    control={control}
                    placeholder={
                      <HStack>
                        <AiOutlineShop />
                        <Text>Search Restaurant</Text>
                      </HStack>
                    }
                  />
                  <FormHelperText>
                    Search for the restaurant.
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="name">Dish name</FormLabel>
                  <Input name="name" {...register("name")} />
                  <FormHelperText>
                    Search for the dish.
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="name">Tags</FormLabel>
                  <SelectAsyncTags
                    name="tags"
                    control={control}
                    placeholder={
                      <HStack>
                        <TagSimple />
                        <Text>Search Tags</Text>
                      </HStack>
                    }
                  />
                  <FormHelperText>Give it some tags.</FormHelperText>
                </FormControl>
                <DropzoneComponent
                  files={files}
                  setFiles={setFiles}
                  directory="dishes"
                />
                <Divider py={3} />
                <FormControl>
                  <FormLabel htmlFor="rating">Your rating</FormLabel>
                  <input
                    type="number"
                    hidden
                    {...register("rating")}
                  />
                  <RatingComponent
                    isEditable
                    onClick={(value) => setValue("rating", value)}
                  />

                  <FormHelperText>
                    Give your dish some stars, or none if it does not
                    diserve them
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="comment">
                    Your comments
                  </FormLabel>
                  <Textarea {...register("comments")} />
                  <FormHelperText>Explain your rating</FormHelperText>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                variant="solid"
                colorScheme="orange"
                isLoading={isSubmitting}
                loadingText="Adding..."
              >
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

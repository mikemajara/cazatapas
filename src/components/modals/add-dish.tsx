import React, { useState } from "react";
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
import { SelectAsyncRestaurant } from "@components/select/async-select-restaurant";
import { AiOutlineShop } from "react-icons/ai";
import { SelectAsyncRestaurantBasic } from "@components/select/async-select-restaurant-basic";
import { useForm } from "react-hook-form";
import ky from "ky";
import _ from "lodash";
import { SelectAsyncTags } from "@components/select/async-select-tags";

export const ModalAddDish = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // react-hook-form
  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    reset,
    resetField,
    unregister,
    formState: { errors, isSubmitting },
  } = useForm();

  // dropzone
  const [files, setFiles] = useState<File[]>([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      logger.debug("add-dish.tsx:acceptedFiles", acceptedFiles);
      const newFiles = [
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      ];
      setFiles(newFiles);
      // setIsModified(isModified || newFiles.length > 0);
    },
  });
  const handleLocalImageDelete = (name: string) => {
    const newFiles = files.filter((e) => e.name !== name);
    setFiles(newFiles);
  };
  const thumbs = files.map((file) => {
    return (
      <ImageThumbnailComponent
        isNew
        key={file.name}
        fileName={file.name}
        fileSrc={file.preview}
        handleImageDelete={() => handleLocalImageDelete(file.name)}
      />
    );
  });

  // submit
  const fileUpload = async (file) => {
    const url = "/api/dishes/upload";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return await ky.post(url, { body: formData }).json();
  };

  async function onSubmit(values) {
    logger.debug("onSubmit:values", values);
    let linkedImages = [];
    try {
      for (const file of files) {
        const { files: uploadedFiles } = await fileUpload(file);
        logger.debug(
          "add-restaurant.tsx:onSubmit:uploadedFiles",
          uploadedFiles,
        );
        linkedImages.push(uploadedFiles.file.newFilename);
      }
      await ky.post(`/api/dishes`, {
        json: {
          ..._.omit(values, [
            "restaurant",
            "comments",
            "dish",
            "tags",
          ]),
          restaurant: {
            connect: {
              id: values.restaurant.id,
            },
          },
          comments: {
            create: {
              text: values.comment,
              user: { connect: { email: "alice@rateplate.io" } },
            },
          },
          images: {
            create: linkedImages.map((e) => ({ fileName: e })),
          },
          tags: {
            connect: values.tags.map((e) => _.pick(e, "id")),
          },
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
      {React.cloneElement(props.button, { onClick: onOpen })}
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
                <Stack>
                  <FormLabel>Images</FormLabel>
                  <SimpleGrid columns={3} justifyItems="center">
                    {thumbs}
                    <Flex
                      mt={5}
                      justifyContent="center"
                      alignItems="center"
                      boxSize="100px"
                      bgColor="gray.200"
                      borderRadius="md"
                      fontSize="38px"
                      cursor="pointer"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <Icon color="gray.500" as={IoIosAdd} />
                    </Flex>
                  </SimpleGrid>
                </Stack>
                <Divider py={3} />
                <FormControl>
                  <FormLabel htmlFor="rating">Your rating</FormLabel>
                  <RatingComponent isEditable />

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

import React, { useEffect, useRef, useState } from "react";
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
  FormHelperText,
  Button,
  useDisclosure,
  Input,
  Stack,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  Box,
} from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { logger } from "@lib/logger";
import ImageThumbnailComponent from "@components/cards/image-thumbnail";
import { useForm } from "react-hook-form";
import ky from "ky";
import { useSession } from "next-auth/react";
import { useShallowRouteChange } from "@hooks/use-shallow-route-change";
import { toast } from "@lib/toast";
import { useRouter } from "next/router";
import _, { indexOf } from "lodash";

export const ModalAddRestaurant = (props) => {
  const {
    isOpen,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const { status } = useSession();
  const router = useRouter();

  const [setKeyAddRestaurant, unsetKeyAddRestaurant] =
    useShallowRouteChange("addRestaurant");

  const onOpen = () => setKeyAddRestaurant(true, onOpenModal);
  const onClose = () => unsetKeyAddRestaurant(onCloseModal);

  useEffect(() => {
    if (props.isOpen) {
      onOpenModal();
    }
  }, [props.isOpen]);

  const handleOnOpenModal = () => {
    if (status === "authenticated") {
      onOpen();
    } else if (status === "unauthenticated") {
      toast.warning(
        `[Log in](/auth/signin?callbackUrl=${router.asPath}) to add a restaurant.`,
      );
    }
  };

  // react-hook-form
  const { handleSubmit, register, reset } = useForm();

  const flagUploadedImages = (uploadedFile) => {
    setFiles((files) => {
      for (let i = 0; i < files.length; i++) {
        if (files[i].name === uploadedFile.originalname) {
          files[i] = {
            ...files[i],
            ...uploadedFile,
            name: files[i].name,
            isLoading: false,
          };
        }
      }
      return [...files];
    });
  };

  const filesUpload = async (file: File) => {
    const url = "/api/restaurants/upload";
    const formData = new FormData();
    formData.append("file", file);
    const response = await ky.post(url, { body: formData }).json();
    flagUploadedImages(response);
  };

  async function onSubmit(values) {
    logger.debug("onSubmit:values", values);
    let linkedImages = files.map((e) => ({
      fileName: e.key,
    }));
    try {
      await ky.post(`/api/restaurants`, {
        json: {
          ...values,
          images: {
            create: linkedImages,
          },
        },
      });
      onClose();
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  // dropzone
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      logger.debug("add-dish.tsx:acceptedFiles", acceptedFiles);
      const newFiles = [
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            isLoading: true,
          }),
        ),
      ];
      setFiles(newFiles);
      for (const file of newFiles) {
        filesUpload(file);
      }
    },
  });

  const handleLocalImageDelete = (name: string) => {
    setFiles((files) => [...files.filter((e) => e.name !== name)]);
  };

  const thumbs = files.map((file) => {
    return (
      <ImageThumbnailComponent
        isLoading={file.isLoading}
        key={file.name}
        fileName={file.name}
        fileSrc={file.preview}
        handleImageDelete={() => handleLocalImageDelete(file.name)}
      />
    );
  });

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
            <ModalHeader>Add restaurant</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <FormControl>
                  <FormLabel htmlFor="restaurant">
                    Restaurant
                  </FormLabel>
                  <Input name="restaurant" {...register("name")} />
                  <FormHelperText>
                    Search for the restaurant.
                  </FormHelperText>
                </FormControl>
                {/* <Box>UploadedFiles: {uploadedFiles.length}</Box> */}
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
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

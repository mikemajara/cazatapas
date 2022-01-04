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
  FormHelperText,
  Button,
  useDisclosure,
  Input,
  Stack,
  Flex,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { logger } from "@lib/logger";
import ImageThumbnailComponent from "@components/cards/image-thumbnail";
import { useForm } from "react-hook-form";
import ky from "ky";

export const ModalAddRestaurant = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // react-hook-form
  const { handleSubmit, register, reset } = useForm();

  const fileUpload = async (file) => {
    const url = "/api/restaurants/upload";
    const formData = new FormData();
    formData.append("file", file);
    logger.debug(
      "add-restaurant.tsx: fileUpload: formData",
      formData,
    );
    // logger.debug("add-restaurant.tsx:fileUpload: ", {
    //   body: formData,
    //   ...config,
    // });
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
      await ky.post(`/api/restaurants`, {
        json: {
          ...values,
          images: {
            create: linkedImages.map((e) => ({ fileName: e })),
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
